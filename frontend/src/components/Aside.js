import React from "react";
import {NavLink} from "react-router-dom"
import {reload} from "./Utils"


const Aside = () => { //activeClassName agit comme un bouton selectionné
    return (
        <div className="ContenaireAside"> 
            <NavLink to= "/principale" exact>
                <img src= "./img/icons/logo_home.png" 
                alt= "incone à cliquer pour poster" 
                className="iconeHomeAside" 
                onClick={() => reload("/principale")}/>
            </NavLink>
            <NavLink to= "/sendpost" exact >
                <img src= "./img/icons/post.svg" 
                alt= "incone à cliquer pour poster" 
                className="iconeAside" 
                onClick={() => reload("/principale")}/>
            </NavLink>
            <NavLink to= "/profil" exact>
                <img src= "./img/icons/profil.svg" 
                alt= "accéder à son profil" 
                className="iconeMiddleAside" 
                onClick={() => reload("/profil")}/>
            </NavLink>
        </div>
    )
};

export default Aside;