import React from 'react';

const IngredientItem = (props) => {
    return ( 
        <div className="container-Item">
            <span className="leftName">{props.item}</span>
        </div>
     );
}
 
export default IngredientItem;