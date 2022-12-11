import Nav from "../../Components/Global/Nav";
import {useState, useEffect} from 'react';
import './Css/HomePage.css';
import Menu from "../../Components/HomePage/Menu";
import IngredientsToUse from "../../Components/HomePage/IngredientsToUse";
import Axios from 'axios';


const HomePage = () => {

    const [foodsFromDB, setFoodsFromDB] = useState([]); 
    const [categoriesFromDB, setCategoriesFromDB] = useState([]);    
    const[openCategory, setOpenCategory] = useState({open:false});
    const [currentFoods, setCurrentFoods] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/api/getCategories").then((response) => {
            setCategoriesFromDB(response.data);
        })
    }, [])

    useEffect(() => {
        Axios.get("http://localhost:3001/api/getFoods").then((response) => {
            setFoodsFromDB(response.data);
        })
    }, [])

    return (  
            <div>
                <Nav openCategory={openCategory} setOpenCategory={setOpenCategory}/> 
                <Menu openCategory={openCategory} currentFoods={currentFoods} setCurrentFoods={setCurrentFoods} categoriesFromDB={categoriesFromDB} foodsFromDB={foodsFromDB} />
                <IngredientsToUse currentFoods={currentFoods} setCurrentFoods={setCurrentFoods}/>
            </div>
    );
}
 
export default HomePage;