const express = require("express");
const router = express.Router();
const controller = require("../controllers/professionalController");
const authJWT = require("../middlewares/professionalJWT");
const multerConfig = require("../config/multerconfig");


//Image uploading using multer in different folders
const uploadProfile = multerConfig("uploads/professionals");
const uploadWork = multerConfig("uploads/works");
const uploadMagazine = multerConfig("uploads/magazines");



// Public Routes
router.post("/signup", controller.Signup);

router.post("/login", controller.Login);

router.get("/getcategories", controller.getCategories);

router.get('/verify-email/:token', controller.verifyEmail);

router.post("/process-payment", controller.processPayment);



// Protected Routes 

router.get("/getplan", authJWT, controller.getPlan);

router.get("/chat", authJWT, controller.accessChat);

router.get("/getmagazines", authJWT, controller.getMagazines);

router.get("/getmagazine?:id", authJWT, controller.getMagazine);

router.post("/addWork",authJWT, uploadWork.single("image"), controller.addWork);

router.get("/getdetails", authJWT, controller.getDetails);

router.post("/generaledit",authJWT, uploadProfile.single("image"), controller.generalEdit);

router.post("/infoedit", authJWT, controller.infoEdit);

router.post("/changepass", authJWT, controller.changePass);

router.post("/socialedit", authJWT, controller.socialEdit);

router.get("/getwork?:id", authJWT, controller.getWork);

router.post("/editwork?:id",authJWT, uploadWork.single("image"), controller.editWork);

router.delete("/deletework?:id", authJWT, controller.deleteWork);

router.post("/chat", authJWT, controller.getChat);

router.post("/message", authJWT, controller.sendMessage);

router.get("/message?:id", authJWT, controller.allMessages);

router.post("/addmagazine",authJWT, uploadMagazine.single("image"), controller.addMagazine);

router.post("/editmagazine?:id",authJWT, uploadMagazine.single("image"), controller.editMagazine);

router.delete("/deletemagazine?:id", authJWT, controller.deleteMagazine);



module.exports = router;
