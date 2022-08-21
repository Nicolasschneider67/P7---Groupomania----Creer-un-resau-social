import React, { useContext } from 'react';
import Log from "../components/Log/index"
import ProfilUpdate from "../components/Profil/ProfilUpdate"
import { UidContext } from '../components/AppContext';

const Profil = () => {
const Uid = useContext(UidContext) //Seul les personnes authentifiées par token peuvent y accéder
    return (
        <div className= "ContenaireProfil">
            {Uid ? (
            <ProfilUpdate />
            ) : (
            <div className= "ContenaireConnexion">
            <div className= "PageConnexion">
                <Log />               
           </div>

           <div className='ImgConnexion'>
                
           </div>

        </div>  
            )}
        </div>
    )
}

export default Profil;