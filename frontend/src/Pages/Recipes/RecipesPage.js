import AlterNavUser from '../../Components/Global/AlterNavUser';
import SelectedFoods from "../../Components/HomePage/SelectedFoods";
import RecipesPagination from "../../Components/PossibleRecipesPage/Pagination/RecipesPagination";
import FoodsNotFound from "../../Components/PossibleRecipesPage/FoodsNotFound";

import {useState, useEffect} from 'react';
import Axios from 'axios';

const RecipesPage = (props) =>{

        const prove = true;
        const selectedFoods = props.location.state; // lo mismo que tener -> const {state} = this.props.location;
        console.log(selectedFoods);
        const [possibleRecipes, setPossibleRecipes] = useState([]);

        /* Create an array with the Id's of the foods selected */
        let foodsId = [];
        selectedFoods.map((food) => {
                return(
                    foodsId = [...foodsId, food.Id]
                )
        })

        /* Let's send de Id's to the backend... */
        useEffect(() => {
            Axios.get("http://localhost:3001/api/getPossibleRecipesId", {params:foodsId}).then((response) => {
                let result = response.data;
                let newArray = [];

                /* This will execute after the backend finish the operation */
                result.map((ids, i) => {
                    ids.map((item) => {
                        newArray = [...newArray, item];
                    })

                    if(result.length === i+1){
                            newArray = newArray.filter((item2, index) => {
                            return newArray.indexOf(item2) === index;
                        })

                        setPossibleRecipes(newArray);

                    }
                    
                })
            })
        }, [])

        if(selectedFoods.length == 0){
            return(
                <div>
                    <FoodsNotFound/>
                </div>
            )
        }
        else{

            return(
                <>
                    <div>
                        <AlterNavUser/>
                        <SelectedFoods selectedFoods={selectedFoods}/>
                        <RecipesPagination possibleRecipes={possibleRecipes}/>
                    </div>
                </>
                )

        }

}


 
export default RecipesPage;