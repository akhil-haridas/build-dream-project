const express = require("express");
const router = express.Router();
const Controller = require("../controllers/clientController");
const authJWT = require("../middlewares/clientJWT");
const multerConfig = require("../config/multerconfig");


//Image uploading using multer in different folders
const uploadProfile = multerConfig("uploads/clients");
const uploadWork = multerConfig("uploads/works");
const uploadMagazine = multerConfig("uploads/magazines");


// Public Routes
router.post("/signup", uploadProfile.single("image"), Controller.Signup);

router.post("/login", Controller.Login);

router.post("/forgotpassword", Controller.forgotPassword);

router.post("/resetpass", Controller.Resetpass);

router.get("/professionals", Controller.GetProfessionals);

router.get("/professional?:id", Controller.GetProfessional);

router.get("/shops", Controller.GetShops);

router.get("/shop?:id", Controller.GetShop);

router.get("/getcategories", Controller.getCategories);

router.get("/getlocations", Controller.getLocation);

router.get("/getlocationss", Controller.getLocations);

router.get("/getmagazines", Controller.getMagazine);

router.post("/verifynumber", Controller.verifyNumber);


// Protected Routes

router.get("/myaccount",authJWT, Controller.MyAccount);

router.post("/chat", authJWT, Controller.getChat);

router.get("/chat", authJWT, Controller.accessChat);

router.post("/message", authJWT, Controller.sendMessage);

router.get("/message?:id", authJWT, Controller.allMessages);

router.post("/addrequirement", authJWT, Controller.addRequirement);


module.exports = router;
