import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Log from "../components/Log";
import Actu from "../components/Actu";
import SendPost from "../components/Post/SendPost";
import Aside from "../components/Aside";



const Principale = () => {
  const Uid = useContext(UidContext);

    return (
      <div className= "Principale">
          {Uid ? (
          <div className="PrincipaleMain">
            <Aside />
            <SendPost />
            <Actu />
          </div>
          ) : (
          <div className= "ContenaireConnexion">
          <div className= "PageConnexion">
              <Log />               
         </div>

      </div>  
          )}
      </div>
  )
}
export default Principale;
