require('dotenv').config({path: './.env'}); // Pour sécuriser l'affichage de nos variables
//Application
const express = require('express'); //Déclaration d'express
const app = express();

//Base de données
const mongoose = require("mongoose"); // Déclaration de notre base de donnée

//Sécurité
const helmet = require('helmet'); //Sécurité de nos en-tête
const cors = require("cors"); //Règle les problèmes d'inter-connexion
const {UserTrue} = require("./middleware/auth"); //TOKEN
const {Authaurization} = require("./middleware/auth"); //Token

//Lecture de certains pilotes
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//Variable des routes
const userRoutes = require("./routes/user"); //Pour la connexion et création de profils
const postRoutes = require("./routes/post");//Pour la gestion des posts

mongoose
  .connect(
    process.env.SECRET_DB,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));


//Méthode CORS pour relier les différents ports, accepter toutes les requêtes énnoncées et accepter les en-tête
const corsOptions = {
  origin: process.env.URL_CLIENT,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(express.json()); //Transformer les réponses au format JSON
app.use(cors(corsOptions));
app.use(helmet({ crossOriginResourcePolicy: false })); //Sécurise les en-tête, nous rajouter cette conditions pour un affichage des images
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

// routes
app.get('*', UserTrue);
app.get('/jwtid', Authaurization, (req, res) => {res.status(200).send(res.locals.user._id)});
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


module.exports = app