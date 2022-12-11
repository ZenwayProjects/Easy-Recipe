import React, {Component} from 'react';
import Category from "./Category";
import "../Css/HomePage/Menu.css";


class Menu extends Component{

    render(){
        let arrayFoods = [{}];
        let foodsTableArray = this.props.foodsFromDB ; //.filter((item) => item.IdCategory !== 1 );


       const filterFoods = (item) => {

            foodsTableArray.map((food)=> {
                if(food.IdCategory === item){
                    // las categorias coinciden
                    arrayFoods = [...arrayFoods, {Name:food.Name, Id:food.IdFood}];
                    foodsTableArray = foodsTableArray.filter((itemFood) => itemFood.IdCategory !== item);
                }
            })
        }

        
        return(                        
            <div className="contenedor-Category" id={this.props.openCategory.open === true? 'ampliar':'reducir'}>                
                <div className="menuTittle">
                    <span>¿Qué alimentos tienes disponibles? {this.props.openCategory.open}</span>
                </div>

                {this.props.categoriesFromDB.map((item)=> {
                    arrayFoods = [];
                    filterFoods(item.IdCategory);
                    return(       
                        <div>
                            <Category name={item.Name} currentFoods={this.props.currentFoods} setCurrentFoods={this.props.setCurrentFoods} items={arrayFoods}/>
                        </div>
                    )
                })}
            </div>
        )    
    }
       
        
    
}
export default Menu;