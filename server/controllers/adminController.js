const Professional = require("../models/professionalModel");
const Shop = require("../models/shopModel");
const Subscription = require("../models/subscriptionModel");
const Category = require("../models/categoryModel");
const Clients = require("../models/clientModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const fs = require("fs"); 
const path = require("path")
const dotenv = require("dotenv").config();

//Nodemailer Transporter 
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_MAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});


exports.Login = async (req, res) => {
  const adminMAIL = process.env.ADMIN_MAIL;
  const adminPASS = await bcrypt.hash(process.env.ADMIN_PASS, 10);
  try {
    const { enteredEmail, enteredPassword } = req.body;

    const userLOGIN = {
      status: false,
      message: null,
      token: null,
      name: null,
      role: null,
    };

    if (enteredEmail != adminMAIL) {
      userLOGIN.message = "Email is wrong,please enter your email.";
      res.send({ userLOGIN });
      return;
    }

    const isMatch = await bcrypt.compare(enteredPassword, adminPASS);

    if (isMatch) {
      const token = jwt.sign({ id: "1234567890" ,role:"admin"}, process.env.JWT_KEY, {
        expiresIn: "30d",
      });
      userLOGIN.status = true;
      userLOGIN.name = "admin";
      userLOGIN.token = token;
      userLOGIN.role = "ADMIN";

      const obj = {
        token,
        name: "admin",
        role: "ADMIN",
      };

      res
        .cookie("jwt", obj, {
          httpOnly: false,
          maxAge: 6000 * 1000,
        })
        .status(200)
        .send({ userLOGIN });
    } else {
      userLOGIN.message = "Password is wrong";
      res.send({ userLOGIN });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};


exports.Permissions = async (req, res) => {
  try {
    const [pros, shops] = await Promise.all([
      Professional.find({ status: "false" }),
      Shop.find({ status: "false" }),
    ]);

    const data = [...pros, ...shops];

    // Sort the data by createdAt in descending order
    data.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });

    res.send({ data });
  } catch (error) {
    console.error("Error in Permissions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.allowUser = async (req, res) => {
  try {
    const userID = req.params.id;

    const user =
      (await Professional.findByIdAndUpdate(
        userID,
        { $set: { status: "true" } },
        { new: true }
      )) ||
      (await Shop.findByIdAndUpdate(
        userID,
        { $set: { status: "true" } },
        { new: true }
      ));

    if (user) {
      const mailOptions = {
        from: process.env.NODEMAILER_MAIL,
        to: user.email,
        subject: "Welcome to BUILD DREAM community",
        text: `Dear ${user.name}, Welcome to BUILD DREM COMMUNITY, your account has been approved. Explore with us...`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });

      return res.status(200).send({ message: "Document updated successfully" });
    }

    return res.status(404).send({ message: "Document not found" });
  } catch (error) {
    console.error("Error in allowUser:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.denyUser = async (req, res) => {
  try {
    const userID = req.params.id;

    const user =
      (await Professional.findByIdAndDelete(userID)) ||
      (await Shop.findByIdAndDelete(userID));

    if (user) {
      const mailOptions = {
        from: process.env.NODEMAILER_MAIL,
        to: user.email,
        subject: "BUILD DREAM COMMUNITY",
        text: `Dear ${user.name}, Sorry for the inconvenience, your Request was declined by admin.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });

      return res.status(200).send({ message: "Document updated successfully" });
    }

    return res.status(404).send({ message: "Document not found" });
  } catch (error) {
    console.error("Error in denyUser:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { category, role } = req.body;
    const image = req.file;

    const existingCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${category}$`, "i") },
    });

    if (!existingCategory) {
      await Category.create({ name: category, image: image.filename, role });
      res.json({ status: true, message: null });
    } else {
      res.json({ status: false, message: "Category already exists" });
    }
  } catch (error) {
    console.error("Error in addCategory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send({ categories });
  } catch (error) {
    console.error("Error in getCategories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.removeCategory = async (req, res) => {
  try {
    const categoryID = req.params.id;

    const category = await Category.findById(categoryID);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    const imagePath = path.join("uploads", "categories", category.image);
    fs.unlinkSync(imagePath);

    await Category.deleteOne({ _id: categoryID });

    return res.status(200).send({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error in removeCategory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.getClients = async (req, res) => {
  try {
    const data = await Clients.find({});
    res.send({ data });
  } catch (error) {
    console.error("Error in getClients:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getClient = async (req, res) => {
  try {
    const clientID = req.query.id;
    const DATA = await Clients.findById({ _id: clientID });
    res.send({ DATA });
  } catch (error) {
     console.error("Error in getClient:", error);
     res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProfessionals = async (req, res) => {
  try {
    const data = await Professional.find({});
    res.send({ data });
  } catch (error) {
     console.error("Error in get Professionals:", error);
     res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProfessional = async (req, res) => {
  try {
    const proID = req.query.id;
    const DATA = await Professional.findById({ _id: proID });
    res.send({ DATA });
  } catch (error) {
     console.error("Error in getProfessional:", error);
     res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getShops = async (req, res) => {
  try {
    const data = await Shop.find({});
    res.send({ data });
  } catch (error) {
     console.error("Error in getShops:", error);
     res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getShop = async (req, res) => {
  try {
    const proID = req.query.id;
    const DATA = await Shop.findById({ _id: proID });
    res.send({ DATA });
  } catch (error) {
     console.error("Error in getShop:", error);
     res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.blockClient = async (req, res) => {
  try {
    const clientID = req.params.id;

    const foundClient = await Client.findById(clientID);
    if (!foundClient) {
      return res.status(404).send({ message: "Client not found" });
    }

    foundClient.block = !foundClient.block;
    await foundClient.save();

    res.send({ status: true });
  } catch (error) {
    console.error("Error in blockClient:", error);
    res.status(500).send({
      status: false,
      message: "An error occurred while blocking/unblocking the client",
    });
  }
};

exports.blockProfessional = async (req, res) => {
  try {
    const professionalID = req.params.id;

    const foundProfessional = await Professional.findById(professionalID);
    if (!foundProfessional) {
      return res.status(404).send({ message: "Professional not found" });
    }

    foundProfessional.block = !foundProfessional.block;
    await foundProfessional.save();

    res.send({ status: true });
  } catch (error) {
    console.error("Error in blockProfessional:", error);
    res.status(500).send({
      status: false,
      message: "An error occurred while blocking/unblocking the professional",
    });
  }
};

exports.blockShop = async (req, res) => {
  try {
    const shopID = req.params.id;

    const foundShop = await Shop.findById(shopID);
    if (!foundShop) {
      return res.status(404).send({ message: "Shop not found" });
    }

    foundShop.block = !foundShop.block;
    await foundShop.save();

    res.send({ status: true });
  } catch (error) {
    console.error("Error in blockShop:", error);
    res.status(500).send({
      status: false,
      message: "An error occurred while blocking/unblocking the shop",
    });
  }
};

exports.getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate({
        path: "user",
        populate: [
          {
            path: "Professional",
            model: "Professional",
            select: "name email",
          },
          {
            path: "Shop",
            model: "Shop",
            select: "name email",
          },
        ],
      })
      .exec();

    res.json({ subscriptions });
  } catch (error) {
    console.error("Error in getSubscriptions:", error);
    res.status(500).send({
      status: false,
      message: "An error occurred while retrieving subscriptions",
    });
  }
};


exports.getDashboard = async (req, res) => {
  try {
    const clientCount = await Clients.countDocuments();
    const proCount = await Professional.countDocuments();
    const shopCount = await Shop.countDocuments();

    const aggregationResult = await Subscription.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: {
            $sum: {
              $toDouble: "$plan",
            },
          },
        },
      },
    ]);


    const totalAmount =
      aggregationResult.length > 0 ? aggregationResult[0].totalAmount : 0;

    const dataArray = [clientCount, proCount, shopCount, totalAmount];

    res.json({dataArray});

  } catch (error) {
    console.error("Error in getDashboard:", error);
    res.status(500).send({
      status: false,
      message: "An error occurred while retrieving the dashboard data",
    });
  }
};