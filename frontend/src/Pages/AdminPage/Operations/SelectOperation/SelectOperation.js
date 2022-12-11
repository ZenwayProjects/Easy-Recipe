import './Style/SelectOperation.css';
import AlterNavAdminMain from '../../../../Components/Global/AlterNavAdminMain';
import { Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';

const SelectOperation = () =>{

    let history = useHistory();

    const componentRestriction = async () => {
        await axios.get("http://localhost:3001/api/isAdminLogged").then((response) => {
            if(response.data.length === 0){
                redirectToHomePage();
            }
        })
    }

    const redirectToHomePage = () => {
        swal({
            title:"Error de permisos",
            text:"Lo sentimos, no tienes permiso para acceder al módulo si no eres un administrador con sesión iniciada.",
            icon:"error",
            buttons:"Cerrar"
        })
        history.push("/role-selection");
    }

    //useEffect to check if there's an admin using the component
    useEffect(() => {
        componentRestriction();
    }, [])

    return (
        <>
            <AlterNavAdminMain />
            <div className="select-operation-page-content">
                <Link to={{pathname:"/categories-operations"}}>
                    <div className='operations-columns categories'>
                        <div className='text-container'>
                            <h1 className='selectOp-text'>Administrar categorías</h1>
                        </div>
                    </div>
                </Link>
                
                <Link to={{pathname:"/foods-operations"}}>
                    <div className='operations-columns foods'>
                        <div className='text-container'>
                            <h1 className='selectOp-text'>Administrar alimentos</h1>
                        </div>
                    </div>
                </Link>

                <Link to={{pathname:"/recipes-operations"}}>
                    <div className='operations-columns recipes'>
                        <div className='text-container'>
                            <h1 className='selectOp-text'>Administrar recetas</h1>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )

}

export default SelectOperation;