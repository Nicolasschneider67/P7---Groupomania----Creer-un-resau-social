import axios from "axios";

export const GET_POST = "GET_POST";
export const CREATEPOST = "CREATEPOST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const ILIKE_POST = "ILIKE_POST";
export const IDISLIKE_POST = "IDISLIKE_POST";



//Pour voir les posts
export const getPost = (numberPost) => { //Pour voir l'ensemble des posts
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`) //Un get car nous souhaitons voir les posts
      .then((res) => {
        const limiteNumberPost = res.data.slice(0, numberPost); //Nous ne gardon que l'affichage de 0 au nombre indiqué
        dispatch({ type: GET_POST, payload: limiteNumberPost }); //Nous limite à 8 postes par affichage
      })
      .catch((err) => console.log(err));
  };
};

//Ajouter un post
export const createPost = (data) => {
  return (dispatch) => {
    return axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}api/post/`,
    data: data,
    withCredentials: true,
    })
  };
};

//Modifier un post
export const PostUpdate = (postId, message) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: {message},
    })
      .then((res) => {
        dispatch({type: UPDATE_POST, payload: { message, postId }});
      })
      .catch((err) => console.log(err));
  };
};

//Supprimer un post
export const PostDelete = (postId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};




export const IlikePost = (postId, userId) => { //en callback il nous faut l'Id du post aimé ainsi que l'user qui a aimé
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/like/` + postId,
      data: {id: userId}, //Codé en backend on rappelle la route api/post/like/:id
    })
      .then((res) => {
        dispatch({type: ILIKE_POST, payload: {postId, userId}});
      })
      .catch((err) => console.log(err));
  };
};

export const IdislikePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/unlike/` + postId,
      data: {id: userId},
    })
      .then((res) => {
        dispatch({ type: IDISLIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};