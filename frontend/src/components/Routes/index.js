import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Header from "../Header";
import Footer from "../Footer";
import Connexion from "../../pages/Connexion";
import Principale from "../../pages/Principale";
import Profil from "../../pages/Profil"; 
import SendPost from "../Post/SendPost";

//Switch nous permet de rediriger l'user vers la page profil s'il n'arrive pas à accéder à la page principale car l'authentification est necessaire

const index = () => {
    return(
        <div className="backgroundNoToken">
            <Router>
                <Header />
                <Switch> 
                    <Route path= "/" exact component= {Connexion} />
                    <Route path= "/profil" exact component= {Profil} /> 
                    <Route path= "/principale" exact component= {Principale} />  
                    <Route path= "/sendpost" exact component= {SendPost} />
                    <Redirect to= "/" />
                </Switch>
                <Footer />
            </Router>
        </div>
    )
};

export default index;