import React, {useState} from 'react';
import axios from "axios"; //Pour faire des requêtes avec notre BDD

const LoginForm =  () => {
    
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const loginAction = async (e) => {

const errorEmail = document.getElementById("erreurLoginPassword");
const errorPassword = document.getElementById("erreurLoginPassword")

    e.preventDefault(); //Nous ne voulons pas que la page se recharge


    await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/login`,
        withCredentials: true,
        data: { //Les données auxquelles s'attend la BDD à recevoir
            email,
            password,
        }
    })
    .then((res) => {
        console.log(res);
        if (res.data.errors) { //S'il y a une erreur, affiche-la moi
            errorEmail.innerHTML = res.data.errors.email;
            errorPassword.innerHTML = res.data.errors.password;
        }
        else { 
            window.location= '/principale'; //S'il n'y a pas d'erreur, transfère moi sur la page principale
            
        }
    })
    .catch((err) => {errorEmail.innerHTML  ="Paire login/Mot de passe incorrecte"})
   
}

    return (  //onSubmit Pour l'envoie du formulaire/connexion va de paire avec submit qui au clique va déclencher l'évènement
    <form action= ""  onSubmit= {loginAction}  id= "formulaire-login">
        <label htmlFor= "email" id="emailConnexion">Email</label>
        <input type= "email"  name= "email"  id= "email" onChange= {(e) => setEmail(e.target.value)} value= {email} required></input>

        <label htmlFor= "password" id="passwordConnexion"> Mot de passe</label>
        <input type= "password" name= "password" id= "password" onChange= {(e) => setPassword(e.target.value)} value= {password} required></input>
    
        <input type= "submit" value="Connexion" id="btnConnexion"></input> 
    <div id= "erreurLoginPassword"></div>
    </form> //Le onChange nous permet de récupérer la valeur inscrite dans value= email
    )
}

export default LoginForm;