import '../Css/PossibleRecipesPage/FoodsNotFound.css';
import AlterNavUser from '../Global/AlterNavUser';
import SadFace from '../../Images/NotFoundFoods/sad-face.png';

import { useHistory } from 'react-router-dom';

const FoodsNotFound = () =>{

    let history = useHistory();

    return(
        <div className=''>
            <AlterNavUser />
            <div className='fnf-content'>
                <div className='fnf-image-content'>
                    <img className='fnf-image' src={SadFace}/>
                </div>
                <p className="fnf-message">Lo sentimos, no has seleccionado ningún alimento sobre el cual podamos realizar una búsqueda. Inténtalo de nuevo, por favor.</p>
                <div class="back-home" onClick={() => {history.push('/homepage')}}>
                    <span>Volver a la página inicial</span>
              </div>
            </div>
        </div>
    );

}

export default FoodsNotFound;