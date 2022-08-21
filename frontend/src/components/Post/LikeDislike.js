import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import { useDispatch } from "react-redux";
import { IlikePost, IdislikePost } from "../../actions/post";

const LikeButton = ({post}) => {
  const [love, setLove] = useState(false); //Nous permettra d'afficher une image en fonction que si la personne a aimé ou pas
  const uid = useContext(UidContext); //Nous récupérons l'ID car nous souhaitons savoir qui a liké
  const dispatch = useDispatch();

  useEffect(() => {
    if (post.likers.includes(uid)) setLove(true); //Nous demandons si l'ID d'un user se trouve dans notre tableau des likers, paramétré en backend
    else setLove(false)}, [uid, post.likers, love]); //On relance la fonction dès qu'un user like un post

  const like = () => {
    dispatch(IlikePost(post._id, uid)) //On rajoute l'ID du user qui like
    setLove(true);
  };

  const unlike = () => {
    dispatch(IdislikePost(post._id, uid))
    setLove(false);
  };



  return (
    <div className="ContenaireLike">
      {uid && love === false && (
        <i className="fa-regular fa-thumbs-up" onClick={like}></i> 
      )}
      {uid && love && (
        <i className="fa-solid fa-thumbs-up" onClick={unlike}></i> 
      )}
      <span className="numberLike" >{post.likers.length}</span>
    </div>
  );
};

export default LikeButton;
