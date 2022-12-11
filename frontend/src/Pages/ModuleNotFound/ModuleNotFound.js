import './Styles/ModuleNotFound.css';
import AlterNav from "../../Components/Global/AlterNav";
import SadFace from '../../Images/NotFoundFoods/sad-face.png'

import { useHistory } from 'react-router-dom';

const ModuleNotFound = () => {

    let history = useHistory();
    
    return(
        <>
            <div className=''>
            <AlterNav />
            <div className='mnf-content'>
                <div className='mnf-image-content'>
                    <img className='mnf-image' src={SadFace}/>
                </div>
                <p className="mnf-message">Módulo no encontrado</p>
                <div class="back-home" onClick={() => {history.push('/role-selection')}}>
                    <span>Volver a la página inicial</span>
              </div>
            </div>
        </div>
        </>
    )

}

export default ModuleNotFound;