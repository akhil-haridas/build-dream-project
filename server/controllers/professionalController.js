const Professional = require("../models/professionalModel");
const Shop = require("../models/shopModel");
const User = require("../models/clientModel");
const Category = require("../models/categoryModel");
const Subscription = require("../models/subscriptionModel");
const Magazine = require("../models/magazinModel");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");

const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv").config();
const fs = require("fs");
const path = require("path")
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(process.env.STRIPE_KEY);

//Secure Password
const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.error(error.message);
    throw new Error("Error while hashing password");
  }
};

//Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_MAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

// Signup

exports.Signup = async (req, res) => {
  const { userName, location, password, role, district, expert, email } =
    req.body;

  try {
    const existingUser = await Professional.findOne({ email: email });
    const existingShop = await Shop.findOne({ email: email });
    const existingClient = await User.findOne({ email: email });

    if (existingUser || existingShop || existingClient) {
      let message = "";
      if (existingUser) {
        message = "You already have a professional account using this email.";
      } else if (existingShop) {
        message = "You already have a shop account using this email.";
      } else {
        message = "You already have a client account using this email.";
      }
      return res.json({
        status: false,
        message: message,
      });
    }

    const hashedPassword = await securePassword(password);
    const verificationToken = uuidv4();

    const professional = await Professional.create({
      name: userName,
      location: location,
      password: hashedPassword,
      role: role,
      district: district,
      expertise: expert,
      email: email,
      status: false,
      verify: false,
      verifyToken: verificationToken,
    });

    if (professional) {
      const mailOptions = {
        from: process.env.NODEMAILER_MAIL,
        to: email,
        subject: "Welcome to BUILD DREAM community",
        html: `
          <p>Dear ${userName},</p>
          <p>You have requested to join our community. Please click the link below to verify your email:</p>
          <a href="http://localhost:4000/professional/verify-email/${verificationToken}">Verify Email</a>
          <p>If you did not request to join our community, you can ignore this email.</p>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    }

    res.json({
      status: true,
      message: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

//Verify the user mail
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await Professional.findOneAndUpdate(
      { verifyToken: token },
      { verified: true, verifyToken: null },
      { new: true }
    );

    if (!user) {
      return res.status(404).send("Verification failed");
    }

    // Redirect the user to a success page
    res.send("verification-success");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

//Login professional
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLOGIN = {
      status: false,
      message: null,
      token: null,
      name: null,
      role: null,
      plan: false,
      id: null,
    };

    let active = false;
    const professional = await Professional.find({ email: email });

    if (professional.length == 0) {
      userLOGIN.message = "Your Email  is wrong";
      res.send({ userLOGIN });
      return;
    }

    if (!professional[0]?.verified) {
      userLOGIN.message =
        "Your Email  is not verified ,please verify your mail";
      res.send({ userLOGIN });
      return;
    }

    if (professional) {
      if (professional[0]?.block) {
        userLOGIN.message = "Your are blocked by admin";
        res.send({ userLOGIN });
        return;
      }

      if (!professional[0]?.status) {
        userLOGIN.message = "Your account is not approved,wait please!";
        res.send({ userLOGIN });
        return;
      }

      const member = await Subscription.findOne({ user: professional[0]._id });
      if (member) {
        const currentDate = new Date();
        const expiryDate = new Date(member.expiry);

        if (expiryDate < currentDate) {
          active = false;
        } else {
          active = true;
        }
      }

      const isMatch = await bcrypt.compare(password, professional[0].password);

      if (isMatch) {
        const token = jwt.sign(
          { id: professional[0]._id },
          process.env.JWT_KEY,
          {
            expiresIn: "30d",
          }
        );
        userLOGIN.status = true;
        userLOGIN.name = professional[0].name;
        userLOGIN.token = token;
        userLOGIN.role = professional[0].role;
        userLOGIN.plan = active;
        userLOGIN.id = professional[0]._id;

        const obj = {
          token,
          name: professional[0].name,
          role: professional[0].role,
          id: professional[0]._id,
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
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//adding work
exports.addWork = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file;
    const proId = req.userID;

    if (!title || !description || !image) {
      return res.status(400).json({ error: "Title, description, and image are required" });
    }

    const work = {
      title,
      image: image.filename,
      description,
    };

    const updatedProfessional = await Professional.findByIdAndUpdate(
      proId,
      { $push: { works: work } },
      { new: true }
    );

    if (!updatedProfessional) {
      return res.status(404).json({ error: "Professional not found" });
    }

    return res.status(200).json({ added: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


//Subscription plan purchase
exports.processPayment = async (req, res) => {
  try {
    const { token, amount, currency, userid } = req.body;
    const userType = "Professional";

    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        token,
      },
    });

    const parsedAmount = parseInt(amount);
    const planValue = (parsedAmount / 100).toString();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parsedAmount,
      currency,
      payment_method: paymentMethod.id,
      confirm: true,
    });

    if (
      paymentIntent.status === "requires_action" &&
      paymentIntent.next_action.type === "use_stripe_sdk"
    ) {
      const currentDate = new Date();
      const expiryDate = new Date(currentDate);
      let planName;

      switch (planValue) {
        case "49":
          expiryDate.setMonth(expiryDate.getMonth() + 1);
          planName = "BASIC";
          break;
        case "99":
          expiryDate.setMonth(expiryDate.getMonth() + 2);
          planName = "STANDARD";
          break;
        case "149":
          expiryDate.setMonth(expiryDate.getMonth() + 3);
          planName = "PREMIUM";
          break;
        default:
          return res.status(400).json({ message: "Invalid payment amount" });
      }

      const subscriptionData = {
        userType,
        user: userid,
        plan: planValue,
        planName,
        expiry: expiryDate,
      };

      await Subscription.create(subscriptionData);
      res.status(200).json({ message: "Payment succeeded!" });
    } else if (paymentIntent.status === "succeeded") {
      res.status(200).json({ message: "Payment succeeded!" });
    } else {
      res.status(400).json({ message: "Payment failed!" });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ message: "Error processing payment" });
  }
};

//professional categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ role: "PROFESSIONAL" });
    const data = categories.map((item) => item.name);
    res.json({ data });
  } catch (error) {
    console.error("Error retrieving categories:", error);
    res.status(500).json({ message: "Failed to retrieve categories" });
  }
};

//Professional Details
exports.getDetails = async (req, res) => {
  try {
    const professional = await Professional.findOne({ _id: req.userID });

    if (!professional) {
      return res.status(404).json({ message: "Professional not found" });
    }

    res.status(200).json({ data: professional });
  } catch (error) {
    console.error("Error fetching professional details:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//General profile edit
exports.generalEdit = async (req, res) => {
  try {
    const { name, expertType } = req.body;
    const image = req.file;

    const user = await Professional.findById(req.userID);

    if (!user) {
      return res.status(404).json({ message: "Professional not found" });
    }

    if (expertType) {
      user.employmentType = expertType;
    }

    if (name) {
      user.name = name;
    }

    if (image) {
      user.image = image.filename;
    }

    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error editing professional details:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//Profile Info Edit
exports.infoEdit = async (req, res) => {
  try {
    const { bio, location, district, mobile } = req.body;

    const user = await Professional.findById(req.userID);

    if (user) {
      if (bio) {
        user.bio = bio;
      }
      if (location) {
        user.location = location;
      }
      if (district) {
        user.district = district;
      }
      if (mobile) {
        user.mobile = mobile;
      }

      await user.save();

      res.status(200).json({ user });
    } else {
      res.status(404).json({ message: "Professional not found" });
    }
  } catch (error) {
    console.error("Error editing professional info:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.changePass = async (req, res) => {
  try {
    const { current, password } = req.body;

    const user = await Professional.findOne({ _id: req.userID });

    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "Professional not found" });
    }

    const passMatch = await bcrypt.compare(current, user.password);

    if (passMatch) {
      const securePassword = await securePassword(password);
      user.password = securePassword;
      await user.save();
      return res.status(200).json({ status: true });
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Current password is incorrect" });
    }
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

exports.socialEdit = async (req, res) => {
  try {
    const { fb, twitter, insta, link } = req.body;

    const user = await Professional.findById(req.userID);

    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "Professional not found" });
    }

    user.facebook = fb || user.facebook;
    user.twitter = twitter || user.twitter;
    user.insta = insta || user.insta;
    user.linkedin = link || user.linkedin;

    await user.save();

    res.json({ status: true, user });
  } catch (error) {
    console.error("Error editing social links:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

exports.getWork = async (req, res) => {
  try {
    const { id } = req.query;
    const professional = await Professional.findById({ "works._id": id });

    if (!professional) {
      return res.status(404).json({ message: "Professional not found" });
    }

    const work = professional.works.find((work) => work._id.toString() === id);

    if (!work) {
      return res.status(404).json({ message: "Work not found" });
    }

    res.status(200).json({ work });
  } catch (error) {
    console.error("Error retrieving work:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.editWork = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file;
    const workId = req.query.id;

    const updates = {};

    if (image?.filename) {
      updates["works.$.image"] = image.filename;
    }
    if (title) {
      updates["works.$.title"] = title;
    }
    if (description) {
      updates["works.$.description"] = description;
    }

    const updatedProfessional = await Professional.findOneAndUpdate(
      { "works._id": workId },
      { $set: updates },
      { new: true }
    );

    if (!updatedProfessional) {
      return res
        .status(404)
        .json({ message: "Professional or work not found" });
    }

    res.status(200).json({ status: true });
  } catch (error) {
    console.error("Error updating work:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteWork = async (req, res) => {
  try {
    const id = req.query.id;

    const professional = await Professional.findOne({ "works._id": id });

    if (!professional) {
      return res
        .status(404)
        .json({ status: false, message: "Professional not found" });
    }

    // Find the work within the works array
    const work = professional.works.find((work) => work._id.toString() === id);

    if (!work) {
      return res.status(404).json({ status: false, message: "Work not found" });
    }

    const imagePath = path.join("uploads", "works", work.image);

    // Delete the work image
    await unlinkAsync(imagePath);

    // Pull the work from the works array
    professional.works.pull({ _id: id });

    await professional.save();

    return res
      .status(200)
      .json({ status: true, message: "Work deleted successfully" });
  } catch (error) {
    console.error("Error deleting work:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getPlan = async (req, res) => {
  try {
    const { userID } = req;
    const plan = await Subscription.findOne({ user: userID });

    if (!plan) {
      return res.status(404).json({ status: false, message: "Plan not found" });
    }

    res.status(200).json({ plan });
  } catch (error) {
    console.error("Error retrieving plan:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getChat = asyncHandler(async (req, res) => {
  const { userId, userType } = req.body;

  const userID = req.userID;
  if (!userId || !userType) {
    console.log("UserId or UserType param not sent with request");
    return res.sendStatus(400);
  }

  try {
    const isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { refType: "Professional", refId: userID } } },
        { users: { $elemMatch: { refType: userType, refId: userId } } },
      ],
    })
      .populate({
        path: "users.refId",
        populate: {
          path: userType,
          model: userType,
          select: "name",
        },
      })
      .populate("latestMessage")
      .populate("groupAdmin");

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [
          { refType: "Professional", refId: userID },
          { refType: userType, refId: userId },
        ],
        latestMessage: null,
        groupAdmin: null,
      };

      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate({
        path: "users.refId",
        populate: {
          path: userType,
          model: userType,
          select: "name",
        },
      });

      res.status(200).json(FullChat);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


exports.accessChat = asyncHandler(async (req, res) => {
  try {
    const userID = req.userID;
    const userType = "Professional";

    const results = await Chat.find({
      "users.refType": userType,
      "users.refId": userID,
    })
      .populate({
        path: "users.refId",
        populate: {
          path: userType,
          model: userType,
          select: "name",
        },
      })
      .populate({
        path: "latestMessage.sender.refId",
        populate: {
          path: "latestMessage.sender.refType",
          model: userType,
          select: "name",
        },
      })
      .sort({ updatedAt: -1 });

    res.status(200).send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

exports.sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  const userID = req.userID;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: { refType: "Professional", refId: userID },
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate({
      path: "sender.refId",
      select: "name image",
    });

    message = await message.populate({ path: "chat" });
    const users = message.chat.users;
    const refTypes = users.map((user) => user.refType);
    const populateOptions = refTypes.map((refType) => ({
      path: "chat.users.refId",
      populate: {
        path: refType,
        model: refType,
        select: "name image",
      },
    }));

    message = await message.populate(populateOptions);

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

exports.allMessages = asyncHandler(async (req, res) => {
  try {
    const chatId = req.query.id;
    const messages = await Message.find({ chat: chatId })
      .populate({
        path: "sender.refId",
        select: "name image",
      })
      .populate("chat");

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

exports.getMagazines = async (req, res) => {
  try {
    const magazines = await Magazine.find({ user: req.userID });

    res.status(200).json({ success: true, magazines });
  } catch (error) {
    console.error("Failed to retrieve magazines:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to retrieve magazines" });
  }
};

exports.addMagazine = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file;

    if (!title || !description || !image) {
      return res.status(400).json({ success: false, error: "Invalid data" });
    }

    const newMagazine = new Magazine({
      user: req.userID,
      userType: "Professional",
      title,
      image: image.filename,
      description,
    });

    const savedMagazine = await newMagazine.save();

    res.status(200).json({ success: true, magazine: savedMagazine });
  } catch (error) {
    console.error("Failed to add magazine:", error);
    res.status(500).json({ success: false, error: "Failed to add magazine" });
  }
};

exports.getMagazine = async (req, res) => {
  try {
    const id = req.query.id;
    const magazine = await Magazine.findById(id);

    if (!magazine) {
      return res
        .status(404)
        .json({ success: false, error: "Magazine not found" });
    }

    res.status(200).json({ success: true, magazine });
  } catch (error) {
    console.error("Failed to retrieve magazine:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to retrieve magazine" });
  }
};

exports.editMagazine = async (req, res) => {
  try {
    const id = req.query.id;
    const { title, description } = req.body;

    const magazine = await Magazine.findById(id);

    if (!magazine) {
      return res
        .status(404)
        .json({ success: false, error: "Magazine not found" });
    }

    if (title) {
      magazine.title = title;
    }

    if (description) {
      magazine.description = description;
    }

    if (req.file) {
      magazine.image = req.file.filename;
    }

    const updatedMagazine = await magazine.save();

    res.status(200).json({ success: true, magazine: updatedMagazine });
  } catch (error) {
    console.error("Failed to update magazine:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to update magazine" });
  }
};

exports.deleteMagazine = async (req, res) => {
  try {
    const id = req.query.id;

    const deletedMagazine = await Magazine.findByIdAndDelete(id);

    if (!deletedMagazine) {
      return res
        .status(404)
        .json({ success: false, error: "Magazine not found" });
    }

    // Delete the image from the folder
    const imagePath = path.join(
      __dirname,
      "../uploads/magazines",
      deletedMagazine.image
    );
    fs.unlinkSync(imagePath);

    const magazines = await Magazine.find({ user: req.userID });
    res.status(200).json({
      success: true,
      message: "Magazine deleted successfully",
      magazines,
    });
  } catch (error) {
    console.error("Failed to delete magazine:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to delete magazine" });
  }
};
