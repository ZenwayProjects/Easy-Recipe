import "../../Css/PossibleRecipesPage/Pagination/RecipesPagination.css";
import Axios from 'axios';
import { useEffect, useLayoutEffect, useState} from 'react';
import RecipeTag from "./RecipeTag";
import {Link} from 'react-router-dom';


const RecipesPagination = (props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minxPageNumberLimit, setMinPageNumberLimit] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const possibleRecipes = props.possibleRecipes;
    const pages = [];

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit){
        pageIncrementBtn = <li onClick={handleNextBtn}> &hellip; </li>
    }

    let pageDecrementBtn = null;
    if (pages.length > maxPageNumberLimit){
        pageDecrementBtn = <li onClick={handlePrevBtn}> &hellip; </li>
    }

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    
    } 


    const handleNextBtn = () => {
        setCurrentPage(currentPage+1);
        if (currentPage+1 > maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minxPageNumberLimit+ pageNumberLimit);
        }
    }
    const handlePrevBtn = () => {
        setCurrentPage(currentPage-1);
        if ((currentPage-1)%pageNumberLimit == 0 ){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minxPageNumberLimit- pageNumberLimit);
        }
    }

    const renderData = (data) => {
        return(
            <div className="content-Container">
                {currentItems.map((todo,index) => {
                    return(
                        <>
                            <RecipeTag key={index} todo={todo}/>
                        </>
                    );
                })}
            </div>
        );
    }

    for (let i=1; i <= Math.ceil(possibleRecipes.length/itemsPerPage); i++){
        pages.push(i);
        
    };

    const renderPageNumbers = pages.map((number) =>  {
    if(number < maxPageNumberLimit+1 && number > minxPageNumberLimit){
        return(
        <li key={number} id={number} onClick={handleClick}
        className={currentPage == number ? "active li" : "li"} >
            {number}
        </li>);} else {
            return null;
        }
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = possibleRecipes.slice(indexOfFirstItem, indexOfLastItem); 
    

        return ( 
            <div className="RecipesPagination-Container">
                
                    {renderData(currentItems)}
                
                    <div className="pagination">
                        <ul className="pageNumbers"> 
                            <li><button onClick={handlePrevBtn} disabled={currentPage == pages[0] ? true : false}>prev</button></li>
                            {renderPageNumbers}
                            <li><button onClick={handleNextBtn} disabled={currentPage == pages[pages.length-1] ? true : false}>next</button></li>
                        </ul>
                    </div>

            </div>
        );

}

export default RecipesPagination;