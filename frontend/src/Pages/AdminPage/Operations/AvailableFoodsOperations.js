import AlterNavAdmin from '../../../Components/Global/AlterNavAdmin';
import FoodsTable from '../../../Components/AdminPage/FoodsOperations/FoodsTable';

import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';

const AvailableFoodsOperations = () => {

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
            <AlterNavAdmin />
            <div className='table-zone'>
                <FoodsTable />
            </div>
            
        </>
    )
}

export default AvailableFoodsOperations;