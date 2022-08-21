import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postComment} from "../../actions/comment";
import {getPost} from "../../actions/post";

import { isEmpty,  } from "../Utils";
import EditDeleteComment from "./EditDeleteComment";

const Comments = ({ post }) => {
const usersData = useSelector((state) => state.usersReducer);
const userData = useSelector((state) => state.userReducer);
const [text, setTextComment] = useState("");

const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (text) { //S'il y a un commentaire d'inscrit en State, alors tu envoies les infos ...
      dispatch(postComment(post._id, userData._id, text, userData.pseudo))
        .then(() => dispatch(getPost()))
        .then(() => setTextComment(''));
    }
  };

  return (
    <div className="commentContenaire">
      {post.comments.map((comment) => {
        return (
          <div className={comment.commenterId === userData._id //Si l'ID du commentateur = à notre Id...
                ? "Mycomment" //alors tu applique une classe spéciale me correspondant
                : "otherComment" //Sinon on applique une classe classique
            } key={comment._id}>

            <div className="picturCommentId">
              <img src={!isEmpty(usersData[0]) && usersData.map((user) => { //Comme pour les posts, on affiche l'image du commentateur via map
                      if (user._id === comment.commenterId) return user.picture}).join("")}  alt="avatar img" className="pictureComment"/>
            </div>

            <div className="CommentId">
                <h3 className="pseudoComment">{comment.commenterPseudo}</h3> 
              <p className="messageComment" >{comment.text}</p>
              <EditDeleteComment comment={comment} postId={post._id} />
            </div>
          </div>
        );
      })}
      {userData._id && ( //Formulaire pour créer un commentaire
        <form action="" onSubmit={handleComment} className="commentForm">
          <input type="text" name="text" id="textareaCommentForm" onChange={(e) => setTextComment(e.target.value)} 
          value={text} placeholder=" Commenter ici  📝 "></input>
          <input type="submit" id="btnCommenter" value="Valider !"></input>
        </form>
      )}
    </div>
  );
};

export default Comments;
