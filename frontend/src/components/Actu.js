//C'est ce component qui va afficher l'ensemble des posts par mapping
import React, { useContext, useEffect, useState } from "react";
import Card from "../components/Post/Card";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../components/Utils";
import { getPost } from "../actions/post";



const Actu = () => {
const [postLoad, setpostLoad] = useState(true) //Nous permet de charger les posts
const [numberPost, setNumberPost] = useState(8); //Nous définissions un nombre limités de post à afficher en page principale
const dispatch = useDispatch(); //Nous permet d'encvoyer une action
const displayPost = useSelector((state) => state.postReducer) //Nous permet d'afficher les posts

const displayMore = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) //Dès que la scroll bar est en bas
     return(setpostLoad(true))//setpostLoad redevient true et donc nous rechargeons 8 pages
  }

    useEffect(() => {
        if (postLoad){ //Si chargement des posts est true
            dispatch(getPost(numberPost)); //Alors envoie le componenent getPost qui affiche les posts
            setpostLoad(false)//Unen fois les posts chargés nous les arretons pour ne pas avoir de boucle infinie
            setNumberPost(numberPost + 8); //Pour réenveoyer 8 nouvaux posts lorsque useEffect est chargé
        }
        window.addEventListener('scroll', displayMore); //A l'écoute d'un scroll...
        return () => window.removeEventListener('scroll', displayMore); // On exécute la fonction displayMore
    },[postLoad, dispatch, numberPost]) 


  return (<div className="displayPost">
    <ul className="displayPostUL">
        {!isEmpty(displayPost[0]) && //Si les données ne sont pas nulles alors affiche moi la suite
        displayPost.map((posts) => {
            return <Card posts={posts} key={posts._id} />
        })}
    </ul>
  </div>
  )
};

export default Actu;