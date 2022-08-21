const User = require("../models/user");
const ObjectID = require("mongoose").Types.ObjectId; //Défini l'ID de l'utilisateur ce qui nous permettra d'identifier chaque user enregistré dans mangoose

//Pour voir tous les utilisateurs
module.exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password"); //Nous permet de cacher les MDP
  res.status(200).json(users);
};

//Pour voir un seul utilisateur
module.exports.getOneUser = (req, res, next) => {
  if(!ObjectID.isValid(req.params.id))
  return(res.status(400).json({message: `Utilisateur inconnu`}))

  else if(
 User.findById(req.params.id, (err, data) => {
  if(!err) res.send(data)
  else (res.status(400).json({message: `Utilisateur inconnu`}))
}).select("-password")); //Nous permet de cacher les MDP;
};

//Pour modifier des utilisateurs
module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Utilisateur inconnu");

  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
          departement: req.body.departement,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//Pour supprimer un utilisateur
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Utilisateur inconnu") ;

  try {
    await User.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//Pour follow un utilisateur
module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("Utilisateur inconnu");

  try {
    // add to the follower list
    await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true }
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err }))),

      // add to following list
      await User.findByIdAndUpdate(
        req.body.idToFollow,
        { $addToSet: { followers: req.params.id } },
        { new: true, upsert: true }
          .then((data) => res.send(data))
          .catch((err) => res.status(500).send({ message: err })))
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//Pour ne plus le suivre
module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("Utilisateur inconnu");

  try {
    await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true }
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err }))),

      // Retirer de la liste des followers
      await User.findByIdAndUpdate(
        req.body.idToUnfollow,
        { $pull: { followers: req.params.id } },
        { new: true, upsert: true }
          .then((data) => res.send(data))
          .catch((err) => res.status(500).send({ message: err })))
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

