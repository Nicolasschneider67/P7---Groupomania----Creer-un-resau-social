import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import thunk from "redux-thunk"; //Pour faire des requêtes asynchrones avec reducer
import rootReducer from "./reducers"; //Nous importons les reducers
import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore } from "redux";
import { BrowserRouter} from 'react-router-dom';
import { getUsers } from "./actions/users"; //Pour voir l'ensemble des users
import { getPost } from "./actions/post"; //Pour voir l'ensemble des posts

import { composeWithDevTools } from "redux-devtools-extension";


import "./styles/index.scss";

const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

store.dispatch(getUsers()); //On importe notre reducer au plus haut de l'application pour voir les utilisateurs comme les follow
store.dispatch(getPost()); //On importe notre reducer au plus haut pour voir l'ensemble des posts

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
