//On déclare la base de donnée
const mongoose = require("mongoose");
//On déclare le pluggin permettant de n'avoir qu'un seul utilisateur
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    pseudo: {type: String, require: true, unique: true, trimp: true, minLenght: 3, maxLenght: 40}, //trimp supprime les espaces en trop
    email: {type: String, required: true, unique: true , lowercase: true},
    password: {type: String, required: true},
    picture: {type: String, default: "./uploads/profil/profil_default.png"},
    departement: {type: String, maxLenght: 200},
    bio: {type: String, maxLenght: 2000},
    follow: {type: [String]}, //Les personnes que notre avatar suit
    followers: {type: [String]}, //Les personnes qui suivront notre avatar
    like: {type: [String]} //Nous servira pour que l'user ne puisse liker qu'un post
});


userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = bcrypt.hash(this.password, salt);
    next();
  });

//Nous permet de donner le vrai MDP à la connexion sinon il recherchera le MDP hashé
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email')
  };

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);