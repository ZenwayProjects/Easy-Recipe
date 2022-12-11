import Carousel from 'react-elastic-carousel';
import Recipe from '../Recipe';

import '../../Css/PossibleRecipesPage/Carousel/PossibleRecipesCarousel.css';

const PossibleRecipesCarousel = (props) => {

    return(
        <div className='carousel-zone'>
            <div className='PRCarousel-template'>
                <Carousel className='PRCarousel'>
                    {
                        props.possibleRecipes.map((possibleRecipes) => {
                            return(
                                <div>
                                    <Recipe recipeName={possibleRecipes.Name} recipeGeneralDescription={possibleRecipes.GeneralDescription} imagePath={possibleRecipes.IconPath}/>
                                </div>
                            );
                        })
                    }
                </Carousel>
            </div>
        </div>
    );

}

export default PossibleRecipesCarousel;
