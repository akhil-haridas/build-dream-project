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
    console.log(error.message);
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

//shop Signup

exports.Signup = async (req, res) => {
  try {
    const { userName, location, password, role, district, category, email } =
      req.body;

    const existingUser = await User.findOne({ email });
    const existingProfessional = await Professional.findOne({ email });
    const existingShop = await Shop.findOne({ email });

    if (existingUser || existingProfessional || existingShop) {
      if (existingUser) {
        return res.json({
          status: false,
          message: "You already have a client account using this email.",
        });
      }

      if (existingProfessional) {
        return res.json({
          status: false,
          message: "You already have a Professional account using this email.",
        });
      }

      return res.json({
        status: false,
        message: "Email already exists. Try logging in with this email.",
      });
    }

    const hashedPassword = await securePassword(password);
    const verificationToken = uuidv4();

    const shop = await Shop.create({
      name: userName,
      location: location,
      password: hashedPassword,
      role: role,
      district: district,
      category: category,
      email: email,
      status: false,
      verify: false,
      verifyToken: verificationToken,
    });

    if (shop) {
      const mailOptions = {
        from: "4khilharidas@gmail.com",
        to: email,
        subject: "Welcome to BUILD DREAM community",
        html: `
          <p>Dear ${userName},</p>
          <p>You have requested to join our community. Please click the link below to verify your email:</p>
          <a href="https://build-dream-server.onrender.com/shop/verify-email/${verificationToken}">Verify Email</a>
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
    console.error("Server Error:", error);
    res.status(500).send("Server Error");
  }
};


exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await Shop.findOne({ verifyToken: token });

    if (!user) {
      return res.status(404).send("Verification failed");
    }

    user.verified = true;
    user.verifyToken = null;
    await user.save();

    res.redirect("/verification-success");
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).send("Server Error");
  }
};


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

    const shop = await Shop.find({ email: email });
    if (!shop) {
      userLOGIN.message = "Your email is wrong";
      res.send({ userLOGIN });
      return;
    }

    if (!shop[0].verified) {
      userLOGIN.message =
        "Your Email  is not verified ,please verify your mail";
      res.send({ userLOGIN });
      return;
    }

    if (!shop[0].status) {
      userLOGIN.message = "Your account is not approved,wait please!";
      res.send({ userLOGIN });
      return;
    }
    if (shop[0]?.block) {
      userLOGIN.message = "Your are blocked by admin";
      res.send({ userLOGIN });
      return;
    }

    const member = await Subscription.findOne({ user: shop[0]._id });
    if (member) {
      const currentDate = new Date();
      const expiryDate = new Date(member.expiry);

      if (expiryDate < currentDate) {
        active = false;
        console.log("Subscription has expired");
      } else {
        active = true;
        console.log("Subscription is still active");
      }
    }

    const isMatch = await bcrypt.compare(password, shop[0].password);

    if (isMatch) {
      const token = jwt.sign({ id: shop[0]._id,role:"shop" }, process.env.JWT_KEY, {
        expiresIn: "30d",
      });
      userLOGIN.status = true;
      userLOGIN.name = shop[0].name;
      userLOGIN.token = token;
      userLOGIN.role = shop[0].role;
      userLOGIN.plan = active;
      userLOGIN.id = shop[0]._id;

      const obj = {
        token,
        name: shop[0].name,
        role: shop[0].role,
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

exports.addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const image = req.file;
    const shopId = req.userID;

    const product = {
      name,
      price,
      image: image.filename,
    };

    // Find the shop by ID and update the products array
    const updatedShop = await Shop.findByIdAndUpdate(
      shopId,
      { $push: { products: product } },
      { new: true }
    );

    if (!updatedShop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    res.status(200).json({ added: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.processPayment = async (req, res) => {
  try {
    const { token, amount, currency, userid } = req.body;
    const userType = "Shop";

    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        token: token,
      },
    });

    const parsedAmount = parseInt(amount);
    let planName;
    const planValue = (parsedAmount / 100).toString(); // Convert amount to string and divide by 100
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
      let expiryDate = new Date(currentDate);

      if (planValue === "49") {
        // 49 plan for 1 month
        expiryDate.setMonth(expiryDate.getMonth() + 1);
        planName = "BASIC";
      } else if (planValue === "99") {
        // 99 plan for 2 months
        expiryDate.setMonth(expiryDate.getMonth() + 2);
        planName = "STANDARD";
      } else if (planValue === "149") {
        // 149 plan for 3 months
        expiryDate.setMonth(expiryDate.getMonth() + 3);
        planName = "PREMIUM";
      }

      let subscriptionData = {
        userType: userType,
        user: userid,
        plan: planValue,
        planName: planName,
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

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ role: "SHOP" }).select("name");
    const data = categories.map((item) => item.name);
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve categories" });
  }
};


exports.getDetailss = async (req, res) => {
  try {
    const userId = req.userID;
    const data = await Shop.findById(userId);

    if (!data) {
      return res.status(404).json({ error: "Shop not found" });
    }

    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve shop details" });
  }
};


exports.generalEdit = async (req, res) => {
  try {
    const { name, businessType } = req.body;
    const image = req.file;
    const userId = req.userID;

    const updates = {};

    if (businessType) {
      updates.businessType = businessType;
    }
    if (name) {
      updates.name = name;
    }
    if (image) {
      updates.image = image.filename;
    }

    const user = await Shop.findByIdAndUpdate(userId, updates, { new: true });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
};


exports.infoEdit = async (req, res) => {
  try {
    const { bio, location, district, mobile } = req.body;

    const proId = req.userID;

    const user = await Shop.findById(proId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

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

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user information" });
  }
};


exports.changePass = async (req, res) => {
  try {
    const { current, password } = req.body;
    const jwtToken = req.cookies.jwt.token;
    const proId = jwt.verify(jwtToken, "secretCode").id;

    const user = await Shop.findById(proId);

    const passMatch = await bcrypt.compare(current, user.password);

    if (passMatch) {
      const securePassword = await bcrypt.hash(password, 10);
      user.password = securePassword;
      await user.save();
      res.json({ status: true });
    } else {
      res.json({ status: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to change password" });
  }
};


exports.socialEdit = async (req, res) => {
  try {
    const { fb, twitter, insta, link } = req.body;
    
    const proId = req.userID

    const user = await Shop.findById(proId);

    if (fb) user.facebook = fb;
    if (twitter) user.twitter = twitter;
    if (insta) user.insta = insta;
    if (link) user.linkedin = link;

    await user.save();

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update social links" });
  }
};


exports.getProduct = async (req, res) => {
  try {
    const id = req.query.id;
    const shop = await Shop.findOne({ "products._id": id });

    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    const product = shop.products.find(
      (product) => product._id.toString() === id
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve product" });
  }
};


exports.editProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const image = req.file;
    const proID = req.query.id;
    const updates = {};

    if (image?.filename) {
      updates["products.$.image"] = image.filename;
    }
    if (name) {
      updates["products.$.name"] = name;
    }
    if (price) {
      updates["products.$.price"] = price;
    }

    const updatedShop = await Shop.findOneAndUpdate(
      { "products._id": proID },
      { $set: updates },
      { new: true }
    );

    if (!updatedShop) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res.json({ status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to update product" });
  }
};


exports.deleteProduct = async (req, res) => {
   try {
     const id = req.query.id;

     const shop = await Shop.findOne({ "products._id": id });

     if (!shop) {
       return res
         .status(404)
         .json({ status: false, message: "Professional not found" });
     }
     const product = shop.products.find((product) => product._id.toString() === id);

     if (!product) {
       return res
         .status(404)
         .json({ status: false, message: "Product not found" });
     }

     const imagePath = path.join("uploads", "products", product.image);

     await unlinkAsync(imagePath);
     shop.products.pull({ _id: id });

     await shop.save();

     return res
       .status(200)
       .json({ status: true, message: "Product deleted successfully" });
   } catch (error) {
     console.error("Error deleting Product:", error);
     res.status(500).json({ message: "Server Error" });
   }
};


exports.getPlan = async (req, res) => {
  try {
    const userId = req.userID;
    const plan = await Subscription.findOne({ user: userId });

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json({ plan });
  } catch (error) {
    console.error("Error retrieving plan:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.getChat = asyncHandler(async (req, res) => {
  const { userId, userType } = req.body;

  
  const userID = req.userID
  if (!userId || !userType) {
    console.log("UserId or UserType param not sent with request");
    return res.sendStatus(400);
  }

  try {
    const isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { refType: "Shop", refId: userID } } },
        { users: { $elemMatch: { refType: userType, refId: userId } } },
      ],
    })
      .populate({
        path: "users.refId",
        populate: {
          path: userType, // For Professional userType
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
          { refType: "Shop", refId: userID },
          { refType: userType, refId: userId },
        ],
        latestMessage: null,
        groupAdmin: null,
      };

      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate({
        path: "users.refId",
        populate: {
          path: userType, // For Professional userType
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
    
    const userID = req.userID
    const userType = "Shop";

    let results = await Chat.find({
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
          model: "latestMessage.sender.refType",
          select: "name",
        },
      })
      .sort({ updatedAt: -1 });

    res.status(200).send(results);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

exports.sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  
  const userID = req.userID
  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: { refType: "Shop", refId: userID },
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

    // Extract the refType values from the users array
    const refTypes = users.map((user) => user.refType);

    // Create an array of objects specifying the model and path for each refType
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
    res.status(400);
    throw new Error(error.message);
  }
});
