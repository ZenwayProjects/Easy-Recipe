import "../../Css/PossibleRecipesPage/Pagination/RecipeTag.css";
import { useState } from "react";
import {Link} from 'react-router-dom';

const RecipeTag = (props) => {

      const [hide, setHide] = useState(false);     

      const onMouseEnter = () => {
            setHide(true);
      }

      const onMouseLeave = () => {
            setHide(false);      
      }

    return (
        <>
            <Link className="link-to-recipe" to={{pathname:"/selected-recipe", state:props.todo.Name}}>
                  <div className="RecipeTag-Container" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                        <h3 className="RecipeTag-Tittle">{props.todo.Name} </h3>
                        <p className="RecipeTag-GeneralDescription">{props.todo.GeneralDescription}</p> 
                        <div className="RecipeTag-GradiantLayer"></div>
                        <div  className="ima" id={hide == true?'hidding':'no-hidding'} style={{backgroundImage : `url(${props.todo.IconPath})`}} ></div>
                  </div>
            </Link>
        </>

      );
}
 
export default RecipeTag;