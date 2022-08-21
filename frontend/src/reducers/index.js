//Regroupe tous nos reducers comme dans un module Saas
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import postReducer from './postReducer';


export default combineReducers({ 
  userReducer,
  usersReducer,
  postReducer,
});