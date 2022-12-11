import '../Css/UserManual/UserManual.css';

import AlterNavUser from '../Global/AlterNavUser';

import step01 from '../../Images/UserManual/1.PNG';
import step02 from '../../Images/UserManual/2.PNG';
import step03 from '../../Images/UserManual/3.PNG';
import step04 from '../../Images/UserManual/4.PNG';
import step05 from '../../Images/UserManual/5.PNG';
import step06 from '../../Images/UserManual/6.PNG';
import step07 from '../../Images/UserManual/7.png';
import step08 from '../../Images/UserManual/8.PNG';
import step09 from '../../Images/UserManual/9.PNG';
import step10 from '../../Images/UserManual/10.PNG';

const UserManual = () => {
    return(
        <div>
            <AlterNavUser />
            <div className="user-manual-content">
                <p className="user-manual-title">¡Hola cocineros!</p>

                <div className="user-manual-steps">
                    <p className="first-explanation">
                        El equipo de Easy Recipe ha decidido preparar un manual para que tú, cocinero o cocinera
                        aprendas los principios básicos de utilización del aplicativo.<br/>
                        A continuación, y mediante una serie de pasos podrás ver detalladamente cómo utilizar Easy Recipe de la forma más eficiente posible:
                    </p>

                    <div className="step step01">
                        <p className='step-title'>Paso 01: </p>
                        <p className='step-content'>
                            Esta es la página inicial de Easy Recipe, vamos a empezar a familiarizarnos con los diferentes componentes:
                        </p>
                        <div className='step-image-content'>
                            <img src={step01} className='step-img'/>
                        </div>
                        
                    </div>

                    <div className="step step02">
                        <p className='step-title'>Paso 02: </p>
                        <p className='step-content'>
                            Para empezar a explorar las múltiples recetas que Easy Recipe tiene para ofrecerte haz click sobre el ícono de menú como se puede ver en la 
                            imagen.<br/>
                            Realizar esta acción pondrá a tu disposición las categorías disponibles como sus alimentos correspondientes.
                        </p>
                        <div className='step-image-content'>
                            <img src={step02} className='step-img'/>
                        </div>
                    </div>

                    <div className="step step03">
                        <p className='step-title'>Paso 03: </p>
                        <p className='step-content'>
                            A continuación, debes hacer click sobre la categoría de la cual quieres seleccionar tus alimentos a disposición.<br/>
                            Esta acción desplegará los alimentos correspondientes de la categoría seleccionada.
                        </p>
                        <div className='step-image-content'>
                            <img src={step03} className='step03-img'/>
                        </div>
                    </div>

                    <div className="step step04">
                        <p className='step-title'>Paso 04: </p>
                        <p className='step-content'>
                            Sub paso 01: Como puedes ver en la imagen, haciendo click sobre la casilla correspondiente al alimento del que dispongas
                            lo agregarás a tu lista de preparación. Así mismo, si desmarcas la casilla correspondiente lo eliminarás de tu lista
                            de preparación.<br/><br/>
                            Sub paso 02: Aquí podrás tener constancia de los alimentos que has agregado a tu lista hasta el momento.<br/><br/> 
                            Sub paso 03: Si haces click sobre el botón "¡Vamos a cocinar!", el sistema almacenará tus alimentos seleccionados y realizará una búsqueda en la 
                            base de datos según tus elecciones.
                        </p>
                        <div className='step-image-content'>
                            <img src={step04} className='step-img'/>
                        </div>
                    </div>

                    <div className="step step05">
                        <p className='step-title'>Paso 05: </p>
                        <p className='step-content'>
                            Una vez realizada la búsqueda, se te pondrá a disposición de una manera muy cómoda, todas las recetas que contengan al menos uno 
                            de los alimentos que tienes a disposición.
                        </p>
                        <div className='step-image-content'>
                            <img src={step05} className='step-img'/>
                        </div>
                    </div>

                    <div className="step step06">
                        <p className='step-title'>Paso 06: </p>
                        <p className='step-content'>
                            Puedes cambiar entre pestañas para navegar por las diferentes recetas encontradas.
                        </p>
                        <div className='step-image-content'>
                            <img src={step06} className='step-img'/>
                        </div>
                    </div>

                    <div className="step step07">
                        <p className='step-title'>Paso 07: </p>
                        <p className='step-content'>
                            Una vez hagas click sobre el campo de la receta que te apetezca cocinar, ingresarás en la página personalizada de dicha receta.
                        </p>
                        <div className='step-image-content'>
                            <img src={step07} className='step-img'/>
                        </div>
                    </div>

                    <div className="step step08">
                        <p className='step-title'>Paso 08: </p>
                        <p className='step-content'>
                            Una vez dentro de la página de la receta seleccionada, podrás ver el nombre de la receta (01), el tiempo de preparación (02), la dificultad para 
                            cocinar (03), el paso a paso para la preparación de la misma (04) y los ingredientes que la componen (05).
                        </p>
                        <div className='step-image-content'>
                            <img src={step08} className='step-img'/>
                        </div>
                    </div>

                    <div className="step step09">
                        <p className='step-title'>Paso 09: </p>
                        <p className='step-content'>
                            Si navegas un poco más podrás conocer la nacionalidad y algunos datos de interés de la receta seleccionada (06).
                        </p>
                        <div className='step-image-content'>
                            <img src={step09} className='step-img'/>
                        </div>
                    </div>

                    <div className="step step10">
                        <p className='step-title'>Paso 10: </p>
                        <p className='step-content'>
                            En la parte inferior de la página podrás encontrar publicidad relacionada a la receta en cuestión (07)
                            y un video correspondiente a la receta seleccionada (08).
                            <br/>
                            POSDATA: No todas las recetas contienen video explicativo.
                        </p>
                        <div className='step-image-content'>
                            <img src={step10} className='step-img'/>
                        </div>
                    </div>

                    <div className="step step-final">
                        <p className='step-content'>
                            Esperamos haber sido lo más intuitivos posibles y que disfrutes de la magia del cocinar mientras aprendes cada día.
                        </p>
                    </div>
    
                </div>

                <div className="user-manual-footer">
                    <p className='footer-content'>Easy Recipe Team, 2022. Todos los derechos reservados.</p>
                </div>

            </div>
        </div>  
    );
}

export default UserManual;