const User = require("../models/user");
const fs = require("fs"); //Nous permet de transférer des fichiers
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/utils.errors");


module.exports.uploadProfil = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType != "image/jpg" &&
      req.file.detectedMimeType != "image/png" &&
      req.file.detectedMimeType != "image/jpeg" &&
      req.file.detectedMimeType != "image/webp" 

    )
      throw Error("Format invalide");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(400).json({ errors });
  }
  const fileName = req.body.name + ".jpg"; //L'image prendra le nom du pseudo +.jpg, ce qui fait que chaque modification remplacera l'ancienne
  
  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../../frontend/public/uploads/profil/${fileName}`
    )
  );

  try {
    await User.findByIdAndUpdate(
      req.body.userId,
        { $set: { picture: "./uploads/profil/" + fileName } },
        { new: true, upsert: true, setDefaultsOnInsert: true })
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err }));
        
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
