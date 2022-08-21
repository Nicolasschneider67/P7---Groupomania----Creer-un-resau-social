import React, { useEffect, useState, useContext } from "react";
import { UidContext } from "../AppContext";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import { PostUpdate } from "../../actions/post";
import {PostDelete} from "../../actions/post";

import LikeDislike from "./LikeDislike";
import Comment from "./Comment";

const Card = ({ posts }) => {
const userData = useSelector((state) => state.userReducer); //Nous récupérons les informations des users comme les likes ...
const usersData = useSelector((state) => state.usersReducer);
const [loadSpinner, setloadSpinner] = useState(true); //Nous créons un load spinner pour l'attente du chargement des cards
const [Update, setUpdate] = useState(false); //Pour modifier un post
const [updateTextPost, setupdateTextPost] = useState(null); //Pour modifier le text d'un post
const [displayComments, setdisplayComments] = useState(false); //Pour faire des commentaires
const dispatch = useDispatch(); //Pour déclencher les actions
const Uid = useContext(UidContext);

useEffect(() => {
  !isEmpty(usersData[0]) && setloadSpinner(false); //Si les données de usersData sont chargées (différentes de 0) alors arrête le loadspinner
  //if (Uid === "62ed297eb2e7ef6b9fdfa357") setUpdate(true) //Rajoute cette condition pour que l'administrateur puisse modifier les posts
}, [usersData]) //callback, tu nous relance la fonction à chaque rajout de données

const UpdateCard = () => {
  if (updateTextPost) {dispatch(PostUpdate(posts._id, updateTextPost));}
  setUpdate(false);
}

const DeleteCard =() => {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer ce superbe article ? 😥")) {dispatch(PostDelete(posts._id))}
}

  return (
  <ul>
    <li className="cardContenair" key= {posts._id}>
      {loadSpinner ? ( //S'il y a besoin d'attendre que la BDD se recharge nous mettrons une animation avec le logo
        <img src= "./img/icons/logo_home.png" alt= "Logo du site qui tourne en attendant que la page se charge" className="loadSpinner fa-spin"/>
      ) : (
        <>
        <div className="Card">
          <div className="cardIdentification">
            <>
            <img src= {!isEmpty(usersData[0]) && usersData.map((user) => { //On realise cette condition dans le cas où les données ne sont pas encore chargées
              if (user._id === posts.posterId) return(user.picture) //Si l'Id du user est le même que celui de la photo, affiche moi sa photo de profil
              }).join("") //Pour enlever les virgules
              } alt= "avatar" className="CardPictureProfil"/>

              <h2 className="IdPoster">
              {!isEmpty(usersData[0]) && usersData.map((user) =>{ 
              if (user._id === posts.posterId) return(user.pseudo)})}
              </h2>
            </>
          </div>
          
            <span className="CardMessage">

            <p>{posts.picture && (<img src= {posts.picture} alt= "commentaire" className= "CardMessagePicture" />)}</p> 
              {posts.video && (
              <iframe
                id="videoCard"
                width="500"
                height="300"
                src={posts.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={posts._id}
              ></iframe>
            )}

            {Update === false && <p>{posts.message}</p>}


            {Update && (
              <div className="updateMessage">
                <textarea id="updateMessageTextarea" defaultValue={posts.message} onChange={(e) => setupdateTextPost(e.target.value)}/>
                <div className="btnMessageUpdate">
                  <button className="btn" id="btnMssg" onClick={UpdateCard}>Valider vos modifications</button>
                </div>
              </div>           
            )}

            {userData._id === posts.posterId && (
            <div className="logoEditPost">
              <div className="btnnUpdate">
                <span onClick={() => setUpdate(true)}>
                <i className="fa-regular fa-pen-to-square" id="logoEdit12"></i>
                </span>
              </div>

              <div onClick={() => {DeleteCard()}}>
                <i className="fa-regular fa-trash-can" id="logoDeletePost" > </i>
              </div>
            </div>
              )}

                
              {(Uid === "62ed297eb2e7ef6b9fdfa357")&& ( //Nous rajoutons cette partie pour que l'administrateur puisse modifier ou supprimer tous kes posts
            <div className="logoEditPost">
              <div className="btnnUpdate">
                <span onClick={() => setUpdate(true)}>
                <i className="fa-regular fa-pen-to-square" id="logoEdit"></i>
                </span>
              </div>

              <div onClick={() => {DeleteCard()}}>
                <i className="fa-regular fa-trash-can"></i>
              </div>
            </div>
              )}

              <div className="logoEditLikeComment">
                <LikeDislike post={posts}/>
                <div className="cardCommentaire">
                  <i onClick={() => setdisplayComments(!displayComments)} id="commentLogo"  className="fa-regular fa-pen-to-square"></i>{posts.comments.length}
                  {displayComments && <Comment post={posts}/>}
                </div>
              </div>
              
            </span>
        </div>
          </>
      )}
          
    </li>
  </ul>            
  );
};

export default Card;
