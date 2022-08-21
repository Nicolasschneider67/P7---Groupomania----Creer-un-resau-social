import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendPictureProfil } from "../../actions/user";

const PictureUpdate = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch(); //envoie les données vers la BDD
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData(); //envoie l'image plus ses données comme le nom
    data.append("name", userData._id); //en backend nous avons programmé name par le pseudo
    data.append("userId", userData._id);
    data.append("file", file);

    dispatch(sendPictureProfil(data, userData._id)); //envoie les données vers la BDD
  };

  return (
    <form action="" onSubmit={handlePicture} className="updatePicture">
      <input className= "bntProfilUpdate" type="file" id="file" name="file" accept=".jpg, .jpeg, .png, .webp" onChange={(e) => setFile(e.target.files[0])}/>
      <input className= "bntProfilUpdate" type="submit" value="Envoyer" />
      <i class="fa-solid fa-camera" id="iconLoadProfilPict"></i>
    </form>
  );
};

export default PictureUpdate;
