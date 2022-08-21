import React, { useState } from 'react';
import Login from "./Login";
import SignUpForm from "./SignUpForm";

const ConnexionLog = () => {
const [loginModal, setLoginModal] = useState(true);
const [signUpModal, setSignUpModal] = useState(false);

const clickModals = (e) => {
    if (e.target.id === "login") {
        setLoginModal(true);
        setSignUpModal(false);
    } else if (e.target.id === "register") {
        setSignUpModal(true);
        setLoginModal(false);
    }
  };

    return (
    <div className= "ConnexionForm">
       <div className= "ContenaireForm">
            <ul>
                <li onClick= {clickModals} 
                className= {loginModal ? "login-btn" : null} //Si ce bouton est true alors active moi la classe, sinon tu mets null
                id="login">Connexion</li> 

                <li onClick= {clickModals} 
                className= {signUpModal ? "login-btn" : null}
                id="register">Inscription</li>
            </ul>
            {loginModal && <Login />}
            {signUpModal && <SignUpForm />}
            
       </div> 
    </div>   
    ) //Si loginModal est true alors tu fais apparaître login / Si signUpModal est true alors tu fais apparaître signUpForm
}

export default ConnexionLog;