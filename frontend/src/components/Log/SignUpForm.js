import React, { useState } from 'react';
import axios from "axios";

const SignUpForm = () => {              //Nous définissions les trois variables necessaires à l'inscription
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [pseudo, setPseudo] = useState("");

const signUpAction = (e) =>  {
    e.preventDefault();
//Nous remontons toutes les erreurs possibles
const InscriptionError = document.querySelector(".InscriptionError");

    axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}api/user/register`,
    withCredentials: true,
    data: {
      pseudo,
      email,
      password,
    },
  })
    .then((res) => {
      window.location= "/";
      alert("Féllicitations ! Vous venez de créer votre compte, veuillez maintenant vous identifier par mesure de sécurité");
    })
    .catch((err) => {
      InscriptionError.innerHTML = err.response.data.error;
      if(err.response.data.message)
      InscriptionError.innerHTML = err.response.data.message

      if(err.response.data.message.email)
      InscriptionError.innerHTML = err.response.data.message.email

      if(err.response.data.message.pseudo)
      InscriptionError.innerHTML = err.response.data.message.pseudo
    })    
};

    return (
<form action= ""  onSubmit= {signUpAction}  id= "formulaire-login">
    <label htmlFor='text' id= "pseudoConnexion">Pseudo</label>
    <input type= "text" name= "pseudo" id="pseudo" onChange={(e) => setPseudo(e.target.value)} value= {pseudo}></input>
    
    <label htmlFor= "email" id="emailConnexion">Email</label>
    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value= {email} required></input>

    <label htmlFor= "password" id="passwordConnexion">Mot de passe</label>
    <input type= "password" name= "password" id= "password" onChange= {(e) => setPassword(e.target.value)} value= {password} required></input>

    <input type= "submit" value="Inscription" id="btnConnexion"></input> 
    <div className= "InscriptionError"></div> 
</form>        
    )
};

export default SignUpForm;