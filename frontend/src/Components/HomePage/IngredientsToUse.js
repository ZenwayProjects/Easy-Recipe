import React from 'react';
import '../Css/HomePage/IngredientsToUse.scss';
import IngredientItem from "./IngredientItem";
import {Link} from 'react-router-dom';


const IngredientsToUse = ({currentFoods, setCurrenFoods}) => {
    
    currentFoods.map((foods) => {
        return(
            <p>{foods.Name}</p>
        )
    })

    return ( 
        
    <>  {/* <> = react.fragmente , necesario para <Link>*/}
        <p>&nbsp;</p>
        <div className="contenedor-Left">
            <div className="contenedor-Food">
                <div className="titulo-Food"> 
                    <h2>¿Qué vas a comer hoy?</h2>
                </div>  

                <div className="contenedor-Ingredientes">
                    {currentFoods.map((item)=> {
                    return(
                        <IngredientItem item={item.Name}/>
                    )})}
                </div>

                <div className="contenedor-Submit">
                    <Link to={{pathname: "/Recipes", state: currentFoods}}>
                        <input type="submit" className='submit-button'  value="¡Vamos a cocinar!"/>
                    </Link>
                </div>
            </div>
        </div>

</>
    );
}
 
export default IngredientsToUse;