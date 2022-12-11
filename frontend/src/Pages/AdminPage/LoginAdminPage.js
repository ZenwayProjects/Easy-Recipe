import './Css/Forms.css';
import FormInputs from '../../Components/AdminPage/RegisterForm/FormInputs';
import AlterNav from '../../Components/Global/AlterNav';

import{useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
const RegisterAdminPage = () => {

    const history = useHistory();

    const [values, setValues] = useState({
        email:"",
        password:"",
    });

    const inputs = [
        {
            id:1,
            name:"email",
            type:"email",
            placeholder:"Correo electrónico que registraste",
            errorMssg: "Debe ser una dirección de correo válida.",
            label:"Correo electrónico",
            required: true
        },
        {
            id:2,
            name:"password",
            type:"password",
            placeholder:"Escribe tu contraseña",
            label:"Contraseña"
        }
    ]

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    //Checking if the info that the admin provided is correct.
    const checkForLoginInfo = async (e) => {
        e.preventDefault();
        let loginValues;
        await axios.get("http://localhost:3001/api/adminLogin", {params:{email:values.email, password:values.password}}).then((response) => {
            loginValues = response.data
            if(loginValues.length === 0){
                if(values.email != "" && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email) === false){
                    swal({
                        title:"Dirección no válida.",
                        text:"No has ingresado un correo electrónico válido.",
                        icon:"error",
                        buttons:"cerrar"
                    })
                }
                else if(values.password === "" || values.email === ""){
                    swal({
                        title:"Campos vacíos",
                        text:"Debes diligenciar todos los campos para continuar.",
                        icon:"warning",
                        buttons:"cerrar"
                    })
                }
            }
            else{
                //LogAdmin
                history.push({
                    pathname:'/select-operation',
                });
            }
        })        
    }

    //Login the admin and updating the administrators table;
    const logAdmin = async () => {
        await axios.put("http://localhost:3001/api/updateAdminStatus", {email:values.email, password:values.password}).then(() => {
            history.push({
                pathname:'/select-operation',
            });
        })
    }

    //function and useEffect to check if a administrator is aleready logged.

    const isAdminLogged = async () => {
        await axios.get("http://localhost:3001/api/isAdminLogged").then((response) => {
            if(response.data.length != 0){
                let emailLogged = response.data[0].email;
                history.push({
                    pathname: '/admin-logged',
                    state: {email: emailLogged}
                });
            }
        });
    }
    
    useEffect(() => {
        isAdminLogged();
    }, [])

    return(
        <>
            <AlterNav />
            <div className="adminp-content">
                <div className='form-container'>   
                    <form>
                        <div className='form-content'>
                            <h1 className='form-title'>Iniciar sesión</h1>
                            {inputs.map(input => (
                                <FormInputs key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                            ))}
                            <div className='form-buttons'>
                                <button className='form-button' type='submit' onClick={checkForLoginInfo}>Iniciar sesión</button>
                                <Link to={{pathname: "/register-admin"}}><button className='form-button'>Registrarme</button></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}

export default RegisterAdminPage;