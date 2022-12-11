import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../Css/PossibleRecipesPage/SelectedFoods.css';

const SelectedFoods = ({selectedFoods}) => {
    
    const options = {
        
        margin:15,
        nav:false,
        dots:false,
       
      };

    return ( 
    <div className="SelectedFoods-Container">
        <h1 className="TittleSelectedFoods">Encontramos estas recetas para ti</h1>

        <div className="CarouselTags-Container">
            <OwlCarousel
                            className="owl-theme "
                            {...options}
            
                        >
                            {selectedFoods.map((item)=>{
                                return(
                                    <div class='itemContainer'>
                                    <h4>{item.Name}</h4>
                                </div>   
                            )})}     
            </OwlCarousel>
        </div> 
   </div>
     
     );
}
 
export default SelectedFoods;