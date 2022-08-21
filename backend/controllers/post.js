const postModel = require("../models/post");
const Post = require("../models/post");
const User = require("../models/user");
const ObjectID = require("mongoose").Types.ObjectId;


//Variables nécessaires pour poster des photos
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

//Pour voir tous les messages
exports.getAllPosts = (req, res, next) => {
  Post.find((err, data) => {
    if (!err) res.send(data);
    else console.log("ID inconnu");
  }).sort({ createdAt: -1 }); //Fais apparaître les commentaires du plus récent au plus ancien
  };

// Création d'un message 
exports.createPost = async (req, res, next) => {
  let fileName;

  if(req.file !== null) {   //On vérifie cette condition car l'user peut ne pas poster d'images
 
//Nous rajoutons la date de post au nom de l'image pour être sur qu'elle soit unique
 fileName = req.body.posterId + Date.now() + ".jpg";

 await pipeline(
  req.file.stream,
  fs.createWriteStream(
    `${__dirname}/../../frontend/public/uploads/posts/${fileName}`
  )
);

  }

  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file !== null ? "./uploads/posts/" + fileName : "",
    video: req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = /*await*/ newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};


//Pour modifier un message
module.exports.modifyPost = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu");

  const updatedRecord = {
    message: req.body.message,
  };

  Post.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, data) => {
      if (!err) res.send(data);
      else console.log("Erreur");
    }
  );
};

//Pour supprimer un post
module.exports.deletePost = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu");

  Post.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) res.send(data);
    else console.log("Delete error");
  });
};

//Pour liker
module.exports.like = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu");

  try {
     Post.findByIdAndUpdate( //On rajoute le like dans le post
      req.params.id,
      {
        $addToSet: { likers: req.body.id }, //On transmet l'id de la personne qui a liké
      },
      { new: true },
      (err, data) => {
        if (err) return res.status(400).send(err);
      }
    );
     User.findByIdAndUpdate( //On rajoute l'utilisateur qui like
      req.body.id,
      {
        $addToSet: { likes: req.params.id }, 
      },
      { new: true },
      (err, data) => {
        if (!err) res.send(data);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

//Pour disliker
module.exports.unlike = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu");

  try {
     Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true },
      (err, data) => {
        if (err) return res.status(400).send(err);
      }
    );
     User.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true },
      (err, data) => {
        if (!err) res.send(data);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Utilisateur inconnu");

  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
          },
        },
      },
      { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};

//Modifier un commentaire
module.exports.editComment = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID inconnu");

try {
  return Post.findById(req.params.id, (err, data) => {
    const findComment = data.comments.find((comment) =>
      comment._id.equals(req.body.commentId)
    );

    if (!findComment) return res.status(404).send("Commentaire non trouvé");
    findComment.text = req.body.text;

    return data.save((err) => {
      if (!err) return res.status(200).send(data);
      return res.status(500).send(err);
    });
  });
} catch (err) {
  return res.status(400).send(err);
}
}

//Supprimer un commentaire
module.exports.deleteComment = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("ID inconnu");

try {
  return Post.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        comments: {
          _id: req.body.commentId,
        },
      },
    },
    { new: true },
    (err, data) => {
      if (!err) return res.send(data);
      else return res.status(400).send(err);
    }
  );
} catch (err) {
  return res.status(400).send(err);
}
}