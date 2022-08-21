import { GET_USERS } from "../actions/users";

const initialState = {}; //Nous permet d'ingérer toute les informations dans nos components

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    default:
      return state;
  }
}
