import './Css/Forms.css';
import FormInputs from '../../Components/AdminPage/RegisterForm/FormInputs';
import AlterNav from '../../Components/Global/AlterNav';

import { Link, useHistory } from 'react-router-dom';
import{useState} from 'react';
import swal from 'sweetalert';
import axios from 'axios';

const RegisterAdminPage = () => {

    const history = useHistory();

    const [values, setValues] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    });

    const inputs = [
        {
            id:1,
            name:"username",
            type:"text",
            placeholder:"Escribe tu nombre de usuario",
            errorMssg: "El nombre de usuario debe contener entre 3 y 20 carácteres; además, no debe contener carácteres especiales.",
            label:"Nombre de usuario",
            pattern:"^[A-Za-z0-9]{3,20}$",
            required:true
        },
        {
            id:2,
            name:"email",
            type:"email",
            placeholder:"Correo electrónico a registrar",
            errorMssg: "Debe ser una dirección de correo válida.",
            label:"Correo electrónico",
            required:true
        },
        {
            id:3,
            name:"password",
            type:"password",
            placeholder:"Intenta no olvidarla",
            errorMssg: "Tu contraseña debe contener entre 8 y 20 carácteres; además, debe incluir al menos 1 letra, 1 número y 1 carácter especial.",
            label:"Contraseña",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-z])(?=.*[!.@#$%^&*])[a-zA-Z0-9!@.#$%^&*]{8,20}`,
            required:true
        },
        {
            id:4,
            name:"confirmPassword",
            type:"password",
            placeholder:"Reescribe tu contraseña",
            errorMssg: "Las contraseñas no coinciden",
            label:"Confirmar contraseña",
            pattern: values.password,
            required:true
        }
    ]

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const registerAdmin = (e) => {
        e.preventDefault();

        let canRegister = {
            userNameOk:false,
            emailOk:false,
            passwordOk:false
        }

        if(values.username === "" && values.email === "" && values.password === "" && values.confirmPassword === ""){
                swal({
                    title:"Campos no llenados",
                    text:"Debes llenar todos los campos del formulario para crear un nuevo perfil de administrador.",
                    icon:"warning",
                    buttons:"Cerrar"
                });
        }
        else{
            if(/^[A-Za-z0-9]{3,20}$/.test(values.username) === true){
                canRegister.userNameOk = true;
            }
            if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email) === true){
                canRegister.emailOk = true;
            }
            if(/^(?=.*[0-9])(?=.*[a-zA-z])(?=.*[!.@#$%^&*])[a-zA-Z0-9!@.#$%^&*]{8,20}/.test(values.password) === true){
                if(values.confirmPassword === values.password){
                    canRegister.passwordOk =  true;
                }
            }
            if(canRegister.userNameOk === true && canRegister.emailOk === true && canRegister.passwordOk === true){
                axios.post("http://localhost:3001/api/adminRegister", {AdminName:values.username, AdminEmail:values.email, AdminPassword:values.password}).then((response) => {
                if(response.data === "err"){
                    swal({
                        title:"Correo electrónico ya registrado",
                        text:"La dirección de correo electrónico que ingresaste ya está registrada en nuestro sistema. Ingresa una nueva.",
                        icon:"error",
                        buttons:"Cerrar"
                    });
                }
                else{
                    swal({
                        title:"Perfil de administrador creado.",
                        text:"Su cuenta ha sido creada correctamente.",
                        icon:"success",
                        buttons:"Cerrar",
                    })
                    history.push('/login-admin');
                    }
                })
            }
            else{
                alert("Hay uno o más errores en las credenciales que ingresaste. Vuelve a intentarlo solucionando estos errores.");
            }
        }
    }

    return(
        <>
            <AlterNav />
            <div className="adminp-content">
                <div className='form-container'>   
                    <form>
                        <div className='form-content'>
                            <h1 className='form-title'>Registrar</h1>
                            {inputs.map(input => (
                                <FormInputs key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                            ))}
                            <div className='form-buttons'>
                                <button className='form-button' type='submit' onClick={registerAdmin}>Registrar perfil</button>
                                <Link to={{pathname: "/login-admin"}}><button className='form-button'>Iniciar sesión</button></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}

export default RegisterAdminPage;