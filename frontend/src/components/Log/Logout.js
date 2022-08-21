import React from "react";
import axios from 'axios';
import cookie from "js-cookie";


const Logout = () => {
    const removeCookie = (key) => {  //Ici la clef sera jwt
        cookie.remove(key, { expires: 1 }); //Au clic le token expire en 1 ms
    };
  
    const logout = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user/logout`,
        withCredentials: true,
      })
        .then(() => removeCookie("jwt")) //Par expérience, mieux vaut également enlever le cooki avec le frontend
        .catch((err) => console.log(err));
      
      window.location = "/";
    };
  
    return (
      <div>
         <img src ="./img/icons/logout.svg" alt="logo de deconnexion" className="logOutHader" onClick={logout}/>
      </div>
    );
  };

export default Logout;