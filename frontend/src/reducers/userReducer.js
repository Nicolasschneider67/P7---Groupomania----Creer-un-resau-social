//Stockage des informations des utilisateurs fournies par actions et les transmet au store
import {
  GET_USER,
  UPLOAD_PICTURE_PROFIL,
  UPDATE_DEPARTEMENT,
  UPDATE_BIO,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "../actions/user";

const initialState = {}; //Nous permet d'ingérer toute les informations dans nos components

export default function userReducer(state = initialState, action) {
  switch (action.type) { //On définit le type d'action qu'il recherche
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE_PROFIL:
      return {
        ...state, //On récupère les données sans les écraser
        picture: action.payload, //Mais on change les données de picture 
      };
      case UPDATE_DEPARTEMENT:
      return {
        ...state,
        departement: action.payload,
      }
      case UPDATE_BIO:
        return {
          ...state,
          bio: action.payload
        }
    case FOLLOW_USER:
      return {
        ...state,
        following: [action.payload.idToFollow, ...state.following],
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.following.filter(
          (id) => id !== action.payload.idToUnfollow
        ),
      };
    default:
      return state;
  }
}
