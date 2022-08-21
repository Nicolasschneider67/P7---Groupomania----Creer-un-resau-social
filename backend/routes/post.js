const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer();

const postCtrl = require("../controllers/post");

//Définition de la fin des endpoint pour les posts
router.get("/", postCtrl.getAllPosts);                                                          
router.post("/", upload.single("file"), postCtrl.createPost);                    
router.put("/:id", postCtrl.modifyPost);                                                        
router.delete("/:id", postCtrl.deletePost);                                                       
router.patch("/like/:id", postCtrl.like);
router.patch("/unlike/:id", postCtrl.unlike);

//Route pour les commentaires. On fait des patchs car on édite à l'intérieur d'un commentaire
router.patch("/commentPost/:id", postCtrl.commentPost);
router.patch("/editComment/:id", postCtrl.editComment);
router.patch("/deleteComment/:id", postCtrl.deleteComment);

module.exports = router;