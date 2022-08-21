# P7---Groupomania----Creer-un-resau-social

Comment faire fonctionner le site ?

1- Cloner le repository

2- Telecharger les pluggins référencés dans les fichiers package.json. Attention certains doivent être installés dans le dossier backend, d'autres dans le dossier frontend

3- Dans le dossier backend, créer un fichier .env et le compléter de cette manière : 
URL_CLIENT = http://localhost:5000    //
SECRET_TOKEN = variable     //
SECRET_DB= (y référer le lien vers votre base de données. Sachant que le projet initial utilise MongoDB

4- Dans le dossier frontend créer également un fichier .env et le compléter de cette manière :
REACT_APP_API_URL= http://localhost:3000

5- Une fois le projet configuré, utiliser la ligne de commande pour vous rendre dans backend et taper npm start. Le port qui doit être sollicité est http://localhost:5000

6- Ouvrir un nouveau terminal et se rendre dans frontend, taper npm start. Le port sollicité est http://localhost:3000

*Si vous n'arrivez pas à voir les images ni à en envoyer il s'agit d'une incompatibilité de la version Multer avec d'autres composants. Pour régler ce problème veuillez
vous rendre dans le dossier fs-temp/lib/write-stream.js De là remplacer la ligne WriteStream.call(this, null, options) par WriteStream.call(this, ' ', options)

Bonne navigation !
