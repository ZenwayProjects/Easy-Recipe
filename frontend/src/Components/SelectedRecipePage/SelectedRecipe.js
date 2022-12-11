import '../Css/SelectedRecipePage/SelectedRecipe.css';

const SelectedRecipe = (props) => {

    let toSend = "";

    function separateIngredients(ingredients){
        let ingredientItem = ingredients.split("-");

        for(let j = 1; j<ingredientItem.length; j++){
            ingredientItem[j] = "- "+ingredientItem[j]+"<br/>";
            toSend += ingredientItem[j];
        }
    }

    const Dividir = (text) => {
        console.log(text)
        let numeroIndicado = 5  ;
        let nextNumero = numeroIndicado +1;
        let beforeNumero = numeroIndicado-1;
        let textoArreglado=[];
        let splitNumber;
        let secciones="";
        let seccion;
     
        do{
          secciones = text.split(numeroIndicado + ".");

           if(secciones.length >= 2){
            
              if(text.split(nextNumero + ".") == 1){
               numeroIndicado++;
                break;
              } else {
                 numeroIndicado = nextNumero;
                 nextNumero++;
              }
            
           } else{
              splitNumber = text.split(beforeNumero + ".");
              console.log(splitNumber.length);
              if( splitNumber == 1){
                 numeroIndicado = beforeNumero;
                 beforeNumero--;
              } else {
                 numeroIndicado--;
                 break;
              }
           }

        }while(true);
        
        for(var i=1; i <= numeroIndicado; i++){
            seccion = text.split(i+".");
            textoArreglado = [...textoArreglado, seccion[0]];
            text = text.replace(seccion[0], '');
        }

        textoArreglado = [...textoArreglado, numeroIndicado + '. ' +seccion[1]];
             
        return textoArreglado;
     }

    return(
            <div className="selected-recipe">
                <div className='main'>
                    <div className='recipe-title-zone'>
                        <div className='section section00'>
                                <div className="recipe-title">
                                    {
                                        props.recipeData.map((selectedRecipe) => {
                                            return(
                                                <p className='recipe-title'>{selectedRecipe.Name}</p>
                                            );
                                        })
                                    } 
                                </div>   
                        </div>
                    </div>


                    

                    <div className='recipe-params-zone'>
                        <div className='section section05'>
                            <div className="recipe-time">
                                {
                                    props.recipeData.map((selectedRecipe) => {
                                        return(
                                            <div>
                                                <p className='subtitle'>Prepara esta receta en: </p>
                                                <h3>{selectedRecipe.Time}</h3>
                                            </div>
                                        );
                                    })
                                } 
                            </div>   
                        </div>

                        <div className='section section06'>
                            <div className="recipe-difficulty">
                                {
                                    props.recipeData.map((selectedRecipe) => {
                                        return(
                                            <div>
                                                <p className='subtitle'>Dificultad: </p>
                                                <h3>{selectedRecipe.Difficulty}</h3>
                                            </div>
                                        );
                                    })
                                } 
                            </div> 
                        </div>
                    </div>




                    <div className='recipe-content-zone'>
                        <div className='section section01'>
                            <div className="recipe-ingredients">
                                {
                                    props.recipeData.map((selectedRecipe) => {
                                        return(
                                            <div>
                                                <p className='subtitle'>Ingredientes: </p>
                                                {separateIngredients(selectedRecipe.IngredientsList)}
                                                <h3 className='ingredient-item' dangerouslySetInnerHTML={{__html: toSend}}></h3>
                                            </div>
                                        );
                                    })
                                } 
                            </div>   
                        </div>

                        <div className='section section02'>
                            <div className="recipe-content">
                                {
                                    props.recipeData.map((selectedRecipe) => {
                                        return(
                                            <div>
                                                <p className='subtitle'>Guía de preparación:</p>
                                                <h3>{Dividir(selectedRecipe.RecipeContent).map((paso)=> {
                                                        return(
                                                            <div>
                                                                <h3>{paso}</h3><br/>
                                                            </div>
                                                        );
                                                    })}</h3>
                                                <div className='iframe-container'>
                                                    <iframe width="560" height="315" src={selectedRecipe.Url} title="YouTube video player"  frameBorder="0" 
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                                </div>
                                            </div>
                                        );
                                    })
                                } 
                            </div>   
                        </div>

                        <div className='section section03'>
                            <div className="recipe-info">
                                {
                                    props.recipeData.map((selectedRecipe) => {
                                        return(
                                            <div>
                                                <p className='subtitle'>Nacionalidad: </p>
                                                <h3>{selectedRecipe.Nacionality}</h3>
                                                <p className='subtitle'>Datos de interés: </p>
                                                <h3>{selectedRecipe.GeneralDescription}</h3>
                                            </div>
                                        );
                                    })
                                } 
                            </div>   
                        </div>

                        <div className='section section04'>
                            <div className="ad-content">
                                <p className='subtitle'>Esto podría interesarte:</p>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
    );

}

export default SelectedRecipe;