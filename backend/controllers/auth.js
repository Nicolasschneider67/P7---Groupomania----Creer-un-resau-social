const User = require('../models/user');
const bcrypt = require('bcrypt') //Hashage du MDP
const jwt = require('jsonwebtoken'); //Authentification par TOKEN
const passwordSchema = require("../models/password"); //Modèle de MPD à respecter
const validator = require("validator"); //Validation de l'Email par reggex
const { signUpError } = require("../utils/utils.errors"); //Pour afficher le message d'erreur que l'utilisateur est déjà enregistré

const createToken = (id) => {
  return jwt.sign({id}, process.env.SECRET_TOKEN , {
    expiresIn: maxAge
  })
};
const maxAge = 1 * 24 * 60 * 60 * 1000; //Token actif pour une journée (exprimée en ms)


//Fonction pour créer un user
exports.signup = (req, res, next) => {
  const validePassword = passwordSchema.validate(req.body.password);
  const valideEmail = validator.isEmail(req.body.email);
  if (validePassword === true && valideEmail === true) {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash,
      });
      user.save()
      
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(err => {
          message = signUpError(err);
          res.status(401).send({message})
        });
    })
    .catch(error => { 
      console.log(error)
      return res.status(500).json({ error }) });
}
else {console.log("mot de passe non conforme au standart")}
};


exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Paire login/Mot de passe incorrecte' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ message: 'Paire login/Mot de passe incorrecte' });
          }
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge}); //Notre token n'est consultable que par notre serveur
    res.status(200).json({ user: user._id})
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//Pour se déconnecter, nous retirons le TOKEN
module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}