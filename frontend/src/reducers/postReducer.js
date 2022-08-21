import {
  GET_POST,
  UPDATE_POST,
  DELETE_POST,
  ILIKE_POST,
  IDISLIKE_POST,
  
} from "../actions/post";

import {
  DELETE_COMMENT,
  EDIT_COMMENT,
} from "../actions/comment"

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST:
      return action.payload;
    case ILIKE_POST:
      return state.map((posts) => { //On mapp pour afficher l'ensemble des personnes qui aiment un post
        if (posts._id === action.payload.postId) {
          return {
            ...posts,
            likers: [action.payload.userId, ...posts.likers], //On rajoute le spred opérateur pour ne pas écraser ce qu'il y a déjà
          };
        }
        return posts;
      });
    case IDISLIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: post.likers.filter((id) => id !== action.payload.userId),
          };
        }
        return post;
      });
    case UPDATE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            message: action.payload.message,
          };
        } else return post;
      });
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postId);
    case EDIT_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) { //Si l'id du post modifié égale l'id du post à modifier
          return {
            ...post, //alors tu gardes le post(ne pas le supprimer)
            comments: post.comments.map((comment) => { //tu me cherches l'ensemble des commentaires
              if (comment._id === action.payload.commentId) {//Si l'id du commentaire égale celui du commentaire qu'on modifie
                return {
                  ...comment, //Tu me gardes les commentaires
                  text: action.payload.text, //Et tu m'envoie le nouveau texte
                };
              } else {
                return comment; //Puis tu restitues l'ensemble des commentaires
              }
            }),
          };
        } else return post;
      });
    case DELETE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id !== action.payload.commentId
            ),
          };
        } else return post;
      });
    default:
      return state;
  }
}
