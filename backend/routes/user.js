const express = require("express");
const router = express.Router();
const checkPassword = require("../middleware/check-password");
const checkEmail = require("../middleware/check-mail");
const multer = require("multer");
const upload = multer();


//Les routes determinant le code pour les utilisateurs
const userCtrl = require("../controllers/user");
const auth = require("../controllers/auth");
const pictureCtrl = require("../controllers/pictureProfil");


//Les routes de connexion et enregistrement
router.post("/register", checkEmail, checkPassword, auth.signup); 
router.post("/login", auth.login);
router.get("/logout", auth.logout);//Permet de se déconnecter mais aussi de retirer le Token actif

//Les routes concernant les utilisateurs
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getOneUser);
router.put("/:id", userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);
router.patch("/follow/:id", userCtrl.follow);
router.patch("/unfollow/:id", userCtrl.unfollow);

//Pour télécharger une photo de profil
router.post("/upload", upload.single("file"), pictureCtrl.uploadProfil )



module.exports = router;