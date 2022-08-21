import React, { useState, useContext } from "react";
import {NavLink} from "react-router-dom";
import {reload} from "../Utils";
import { useDispatch, useSelector } from "react-redux";
import PictureUpdate from "./PictureUdpate";
import {departementAction, bioAction} from "../../actions/user";


const ProfilUpdate = () => {
  const dispatch = useDispatch();
  //Nous permet de créer des boutons dynamiques
  const [departementForm, setDepartementForm] = useState(false)//Nous le mettons sur false car nous ne souhaitons pas du formulaire de base
  const [bioForm, setBioForm] = useState(false)

  const userData = useSelector((state) => state.userReducer);
  const [departement, setDepartement] = useState("")
  const [bio, setBio] = useState("");

  const departementUpdate = () => {
    dispatch(departementAction(userData._id, departement));
    window.location.reload();
  }

  const bioUpdate = () => {
    dispatch(bioAction(userData._id, bio));
    window.location.reload();
  }

  return (
<>
  <NavLink to= "/principale" exact>
    <i class="fa-solid fa-circle-chevron-left" id="profilBack" onClick={() => reload("/principale")}></i> 
  </NavLink>   
    <div className="contenaireProfil">
      <h1> Profil de {userData.pseudo}</h1>

        <div>
          <img src={userData.picture} alt="pict de profil" className="profilPicture"/>
          <PictureUpdate />
        </div>

        <div className="departementProfil">
          <h2>Métier</h2>
        {departementForm === false && (
              <>
                <p onClick={() => setDepartementForm(!departementForm)}>{userData.departement}</p>
                <button id= "btnProfil" onClick={() => setDepartementForm(!departementForm)}>
                  Modifier votre métier
                </button>
              </>
            )}
            {departementForm && (
              <>
                <input
                  type="text"
                  defaultValue={userData.departement}
                  onChange={(e) => setDepartement(e.target.value)}
                ></input>
                <button onClick={departementUpdate}>Valider</button>
              </>
            )}
        </div>

        <div className="bioProfil">
          <h2>Biographie</h2>
        {bioForm === false && (
              <>
                <p onClick={() => setBioForm(!bioForm)}>{userData.bio}</p>
                <button id= "btnProfil" onClick={() => setBioForm(!bioForm)}>
                  Modifier votre biographie
                </button>
              </>
            )}
            {bioForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={bioUpdate}>Valider</button>
              </>
            )}
        </div>
    </div>  
</> 
      )
};
           
export default ProfilUpdate;
