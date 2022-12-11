import logo from "../Images/logo.png";
import '../Css/Global/AlterNavAdminMain.css';

import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from "react";
import swal from 'sweetalert';
import axios from "axios";

const AlterNavAdminMain = () => {

  let history = useHistory();
  let adminEmail = "";

  const checkForAdminLogged = async () => {
    await axios.get("http://localhost:3001/api/isAdminLogged").then((response) => {
        adminEmail = response.data[0].email
    })
  }

  const logOut = async () => {
    await axios.put("http://localhost:3001/api/logOutAdmin", {email:adminEmail}).then(() => {
          history.push("/login-admin");
        })
  }

  const confirmLogout = async (e) => {
      e.preventDefault();
      swal({
        title:"Confirmación de cierre de sesión",
        text:"¿Estás seguro de que quieres cerrar tu sesión?",
        icon:"warning",
        buttons:["No", "Sí"]
      }).then(response => {
        if(response){
          logOut();
        }
      })
  }

  useEffect(() => {
    checkForAdminLogged();
  }, [])

    return (

        <div style={{height:"70px"}}>
          <header className="nav">
            <div className="left">
              <img  className="logo" src={logo} onClick={() => {history.push('/role-selection')}}/>
              <div className="title-container"><span className="title">Easy Recipe</span></div>
            </div>
            <div className="right">
                <button className="logout-button" onClick={confirmLogout}>Cerrar sesión</button>
            </div>
          </header>
        </div>
     );
}
 
export default AlterNavAdminMain;