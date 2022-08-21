import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import { createPost, getPost } from "../../actions/post";

const SendPost = () => {
const [loadSpinner, setLoadSpinner] = useState(true) //Nous permet de charger les posts. Util car nous chargerons des videos ou photos
const [sendMessage, setSendMessage] = useState(""); //Constitue le message tel quel
const [file, setFile] = useState(); //Pour envoyer des fichiers. On le laisse vide car on peut envoyer un post sans fichiers annexes
const [senPicture, setSendPicture] = useState(null);//Pour poster des photos
const [sendvideo, setSendVideo] = useState(""); //Pour poster des videos

const userData = useSelector((state) => state.userReducer);
const dispatch = useDispatch();

const handlePost = async () => {
  if (sendMessage || senPicture || sendvideo || file) { //S'il y a du contenu
    const data = new FormData();//envoie moi cette constante qui stocke de la data
    data.append('posterId', userData._id);//l'utilisateur qui poste
    data.append('message', sendMessage);//Un message
    if (file) data.append("file", file);//un fichier s'il y a du contenu
      data.append('video', sendvideo);//une video
        await dispatch(createPost(data));//On attend qu'il ai créer le poste
        dispatch(getPost()); //Puis on recupère les posts
        handleCancel();//Puis on remet la div de post à 0 pour le prochain 
  } else {
    alert("Vous manquez d'inspirtation ? 😕")
  }
};

useEffect(() => {
  if (!isEmpty(userData)) setLoadSpinner(false); //Si nous avons les données, arrête le loadSpinner.

  
const handleVideo = () => {
  let findLink = sendMessage.split(" ");//Nous permet de découper l'URL de la video
    for (let i = 0; i < findLink.length; i++) {//De cette manière nous testons chaque élément splité
      if (
        findLink[i].includes("https://www.youtube") || //Si tu trouves un élément de la video qui comprend ces chaînes de caractère
        findLink[i].includes("https://youtube")
      ) {
        let embed = findLink[i].replace("watch?v=", "embed/");//Dès qu'il voit watch, remplace par embed. Cette transformation est nécessaire pour lire une video en dehors de youtube
        setSendVideo(embed.split("&")[0]);//dès qu'on voit &, on le splite pour ne garder que ce qu'il y a avant
        findLink.splice(i, 1); //Pour supprimer le lien de la video dans le commentaire
        setSendMessage(findLink.join(" "));
        setSendPicture("");// S'il y a la video on enlève la photo
      };
    };
  };
  handleVideo();
}, [userData, sendMessage, senPicture, sendvideo]);//On relance la fonction dès qu'on charge de la data

const handlePicture = (e) => { //Pour envoyer les photos à la base de données
  setSendPicture(URL.createObjectURL(e.target.files[0]))
  setFile(e.target.files[0]);
  setSendVideo(''); //On annule la video
}; 
 
const handleCancel = () => { //Pour annuler on passe la string sur vide. Rappellant que la photo et la video ne sont que des strings
  setSendMessage("");
  setFile("");
  setSendPicture("");
  setSendVideo(""); 
};

console.log(userData)
  return (
    <div className="ContenairePost">
      {loadSpinner ? ( //Si nous sommes entrain de charger les données, fait apparaît le loadspinner
        <img src="./img/icons/logo_home.png" alt= "logo de l'entreprise" className="loadSpinnerPost fa-spin"/>    
      ) : (
          <div className="Userdata">
            <img src={userData.picture} alt="utilisateur avatar" className="sendPostPict"/>
              <span class="Userinfo">
                <h2>{userData.pseudo}</h2>
                <textarea name="message" id="textareaSendPost" placeholder="Partagez avec votre communauté 🦁🦊🦆" onChange={(e) => setSendMessage(e.target.value)} value={sendMessage}></textarea>
               
                <div className="MessageFooter">
                  {isEmpty(sendvideo) && ( //Si le fichier image est nul, tu peux télécharger une video
                  <>
                   <i className="fa-solid fa-camera" id="iconPictMessage"></i>                             
                   <input type="file"  id="telechargementImage" name="file" accept=".jpg, .jpeg, .png, .webp" onChange={(e) => handlePicture(e)}/>
                  </>
                  )}
                  {sendvideo && (
                  <button onClick={() => setSendVideo("")}>Supprimer votre video</button>
                  )}
                    <div className="btnSend">
                      {sendMessage || senPicture || sendvideo.length > 1 ? (//On ne peut annuler que s'il y a du contenu
                      <button className="cancelBtn" onClick={handleCancel}>Annuler</button>
                    ) : null}
                      <button className="sendBtn" onClick={handlePost}>Envoyer</button>
                    </div>
                </div>
            </span>
    </div>
      )}
    </div>
  );
};

export default SendPost;
