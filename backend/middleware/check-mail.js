module.exports = (req, res, next) => {
    const validEmail = (email) => {
       let emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/ //n'importe quel caractère avec un point accepté + @ suivi de n'importe quel caractère avec un point + n'importe quel mot entre 2 et 3 caractères
        let isRegexTrue = emailRegexp.test(email);
        isRegexTrue ? next() : res.status(400).json({ message: 'Mail invalide, veuillez ne pas mettre de caractères spéciaux' });
    }
    validEmail(req.body.email)
  };
  