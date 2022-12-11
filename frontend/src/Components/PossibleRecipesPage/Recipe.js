import {Link} from 'react-router-dom';
import '../Css/PossibleRecipesPage/Recipe.css';

const Recipe = (props) =>{

    const Name = props.recipeName;    

    return(
        <>
            <div className="recipe-preview" style={{backgroundImage : `url(${props.imagePath})`}}>
                <h1 className='recipe-title'>{props.recipeName}</h1>
                <p>{props.recipeGeneralDescription}</p>
                <Link to={{pathname:"/selected-recipe", state:Name}}><button className='view-recipe-button'>¡Cocinémoslo!</button></Link>
            </div>  
        </>
    );

}

export default Recipe;