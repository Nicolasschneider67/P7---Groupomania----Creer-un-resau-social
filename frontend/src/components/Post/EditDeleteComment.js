import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import {useDispatch} from "react-redux";
import { deleteComment, editComment } from "../../actions/comment";


const EditDeleteComment = ({ comment, postId }) => {
const Uid = useContext(UidContext);
const [Mycomment, setMycomment] = useState(false);
const [modif, setmodif] = useState(false);
const [text, setText] = useState("");
  
const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(editComment(postId, comment._id, text));
      setText("");
      setmodif(false);
    }
  };

  const handleDelete = () => dispatch(deleteComment(postId, comment._id));

  useEffect(() => {
    const ismycomment = () => {
      if (Uid === comment.commenterId) { //Si c'est mon commentaire alors affiche moi Mycomment qui devient true
        setMycomment(true);
      }
    };
    ismycomment();
  }, [Uid, comment.commenterId]); //Les props sont définies dans la fonction

  return (
    <div className="ContenaireEdit">
      {Mycomment && modif === false && (
        <span onClick={() => setmodif(!modif)}>
          <i className="fa-regular fa-pen-to-square" id="logoeditComment" ></i>
        </span>
      )}
      {Mycomment && modif && (
      <> 
        <form action="" onSubmit={handleEdit} className="commentEditForm">
          <label htmlFor="text" onClick={() => setmodif(!modif)}></label>
          <textarea type="text" name="text" onChange={(e) => setText(e.target.value)} defaultValue={comment.text}></textarea> 
          <input type= "submit" id="btnCommentEditForm" value="Valider votre modification"></input>       
        </form>
        <i className="fa-regular fa-trash-can" onClick={() => handleDelete()}></i>
      </>   
      )}
       
    </div>
  );
};

export default EditDeleteComment;
