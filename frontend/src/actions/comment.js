import axios from "axios";

export const POST_COMMENT = "POST_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";


//Ajouter un commentaire
export const postComment = (postId, commenterId, text, commenterPseudo) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/post/commentPost/${postId}`,
        data: { commenterId, text, commenterPseudo },
      })
        .then((res) => { //On rajoute cette promesse pour avoir un id unique sur chaque post
          dispatch({ type: POST_COMMENT, payload: { postId } });
        })
        .catch((err) => console.log(err));
    };
  };
  
  //Modifier un commentaire
  export const editComment = (postId, commentId, text) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/post/editComment/${postId}`,
        data: {commentId, text},
      })
        .then((res) => {
          dispatch({ type: EDIT_COMMENT, payload: {postId, commentId, text}});
        })
        .catch((err) => console.log(err));
    };
  };
  
  //Supprimer un commentaire
  export const deleteComment = (postId, commentId) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/post/deleteComment/${postId}`,
        data: {commentId},
      })
        .then((res) => {
          dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
        })
        .catch((err) => console.log(err));
    };
  };