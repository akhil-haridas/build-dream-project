const express = require("express");
const router = express.Router();
const Controller = require("../controllers/shopController");
const authJWT = require("../middlewares/shopJWT");
const multerConfig = require("../config/multerconfig");


//Image uploading using multer in different folders
const uploadProfile = multerConfig("uploads/shops");
const uploadProduct = multerConfig("uploads/products");
const uploadMagazine = multerConfig("uploads/magazines");



// Public Routes
router.post("/signup",Controller.Signup);

router.post("/login", Controller.Login)

router.post("/process-payment",Controller.processPayment);

router.get("/getcategories", Controller.getCategories);

router.get("/verify-email/:token",Controller.verifyEmail);



// Protected Routes 

router.post("/addProduct",authJWT, uploadProduct.single("image"), Controller.addProduct);

router.get("/getdetailss", authJWT, Controller.getDetailss);

router.post("/generaledit",authJWT, uploadProfile.single("image"),Controller.generalEdit);

router.post("/infoedit", authJWT, Controller.infoEdit);

router.post("/changepass", authJWT, Controller.changePass);

router.post("/socialedit", authJWT, Controller.socialEdit);

router.get("/getproduct?:id", authJWT, Controller.getProduct);

router.post("/editproduct?:id",authJWT, uploadProduct.single("image"), Controller.editProduct)

router.delete("/deleteproduct?:id", authJWT, Controller.deleteProduct);

router.get("/getplan", authJWT, Controller.getPlan);

router.post("/chat", authJWT, Controller.getChat);

router.get("/chat", authJWT, Controller.accessChat);

router.post("/message", authJWT, Controller.sendMessage);

router.get("/message?:id", authJWT, Controller.allMessages);

// router.post("/addmagazine",authJWT, uploadMagazine.single("image"), controller.addMagazine);

// router.post("/editmagazine?:id",authJWT, uploadMagazine.single("image"), controller.editMagazine);

// router.delete("/deletemagazine?:id",authJWT, controller.deleteMagazine);


module.exports = router;
