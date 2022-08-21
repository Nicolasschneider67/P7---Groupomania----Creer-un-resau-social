import React from "react";
import {NavLink} from "react-router-dom";
import Logout from "./Log/Logout";

const Header = () => {

return(
    <div className="Head">
        <div className="ContenaireHeader">
            <img src= "./img/icons/logo.png" alt="Logo de l'entreprise GROUPOMANIA" className='logoHeader'/>
            <span className="TexteHeader">
                Le site qui vous ressemble et vous rassemble
            </span>
        </div>
       <Logout />
    </div>
)


}

export default Header;