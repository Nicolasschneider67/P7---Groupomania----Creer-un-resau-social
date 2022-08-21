const mongoose = require('mongoose') //Nous avons besoin d'importer la base de données pour stocker les things/posts

//Nous créons un schéma qui devra être respecté pour chaque post. L'id de l'image n'est pas obligatoire car il est généré par Mongoose
const postSchema = new mongoose.Schema({
  posterId: { type: String, required: true },
  picture: { type: String}, //N'est pas obligé de poster une photo
  video: {type: String},
  message: { type: String, maxlenght: 700 },
  likers: { type: [String] }, //Tout ce qui se réfère aux likes n'est pas obligatoire car l'user peut ne pas donner son avis
  comments: {type: [{
    commenterId: String,
    commenterPseudo: String,
    text: String  }],  
},
},
{timestamps: true,}
)

module.exports = mongoose.model('post', postSchema)