const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authJWT = require("../middlewares/adminJWT");
const multerConfig = require("../config/multerconfig");


//Image uploading using multer in different folders
const uploadCategory = multerConfig("uploads/categories");


router.post("/login", adminController.Login);

router.get("/permissions",authJWT, adminController.Permissions)

router.get('/allow-user/:id',authJWT, adminController.allowUser)

router.get('/deny-user/:id',authJWT, adminController.denyUser)

router.post('/addcategory',authJWT, uploadCategory.single('image'), adminController.addCategory)

router.get('/getcategories',authJWT, adminController.getCategories)

router.get("/removeCategory/:id",authJWT, adminController.removeCategory);

router.get("/getclients",authJWT, adminController.getClients);

router.get("/getclient?:id",authJWT, adminController.getClient);

router.get("/getprofessionals",authJWT, adminController.getProfessionals);

router.get("/getprofessional?:id",authJWT, adminController.getProfessional);

router.get("/getshops",authJWT, adminController.getShops);

router.get("/getshop?:id", authJWT, adminController.getShop);

router.get("/blockclient/:id", authJWT, adminController.blockClient);

router.get("/blockprofessional/:id", authJWT, adminController.blockProfessional);

router.get("/blockshop/:id", authJWT, adminController.blockShop);

router.get("/getsubscriptions", authJWT, adminController.getSubscriptions);

router.get("/dashboard",authJWT,adminController.getDashboard);

module.exports = router;