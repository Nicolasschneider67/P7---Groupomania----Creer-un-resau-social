module.exports.signUpError = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo"))
    errors.pseudo = "Pseudo déjà utilisé";

  if (err.message.includes("email"))
   errors.email = "Email déjà enregistré";

  if (err.message.includes("password"))
    errors.password = "Le MDP doit faire 8 caractère au minimum, comprenant une majuscule et un chiffre";

  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: ''};

  if (err.message.includes('Format invalide'))
    errors.format = "Format incompatabile";

  return errors
}