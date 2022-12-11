import './Styles/RecipesTable.css'; 
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, TablePagination, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {useState, useEffect} from 'react';
import swal from 'sweetalert';
import axios from 'axios';


const useStyles = makeStyles((theme)=> ({
    buttonInsert:{
        margin: '20px',
    },
    table:{
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px 10px 10px 10px"
    },
    tHead:{
        backgroundColor:'#5F5AA2'
    },
    tHeadFont:{
        color: 'white',
        fontWeight: 'bold',
    },
    icons:{
        cursor: 'pointer'
    },
    modal: {
        position:'absolute',
        width:400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid black',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
        top:'5%',
        left:'40%'
    },
    inputMaterial:{
        width:'100%'
    },
    modalTitle:{
        color:'black'
    },
    deleteModalText:{
        color:'black'
    }
}));


const RecipesTable = () => {

    const styles = useStyles();

    //Table configuration(paging, filtering)
        //Object to define table head cells
        const tableHeads = [
            {
                id: 1, 
                label:"Nombre de la receta"
            },
            {
                id: 2, 
                label:"Nacionalidad"
            },
            {
                id: 3, 
                label:"Dificultad de preparación"
            },
            {
                id: 4, 
                label:"Tiempo de preparación"
            },
            {
                id: 5, 
                label:"Operaciones"
            },
        ]

        //Table paging
        const pages = [7, 14, 21];
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(pages[page])

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        }

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        }

        const recipesAfterPagingAndSorting = () => {
            return (
                avRecipes.slice(page*rowsPerPage, (page+1)*rowsPerPage)
            )
        }


    //Function to bring the data from the database
    const [avRecipes, setAvRecipes] = useState([]);
    const getAvailableRecipes = async () => {
        await axios.get("http://localhost:3001/api/getAllRecipes").then((response) => {
            const recipesData = response.data;
            setAvRecipes(recipesData);
        })
    }


    //useEffects
    useEffect(() => {
        getAvailableRecipes();
    })



    //States configuration

        //Insert modal
        //State to control the insert modal
        const [openInsertModal, setOpenInsertModal] = useState(false);
        //State to control the update modal
        const [openUpdateModal, setOpenUpdateModal] = useState(false);
        //State to control the delete modal
        const [openDeleteModal, setOpenDeleteModal] = useState(false);
        //Satate to handle the food insertion
        const [recipeToInsert, setRecipeToInsert] = useState({
            Name:'',
            IconPath:'',
            GeneralDescription:'',
            Nacionality:'',
            Difficulty:'',
            Time:'',
            IngredientsList:'',
            RecipeContent:'',
            Url:''
        })
        //Satate to handle the food insertion
        const [recipeToUpdate, setRecipeToUpdate] = useState({
            IdRecipe:'',
            Name:'',
            IconPath:'',
            GeneralDescription:'',
            Nacionality:'',
            Difficulty:'',
            Time:'',
            IngredientsList:'',
            RecipeContent:'',
            Url:''
        })

    
    //Functions to control the modals
        
        //Handle input changes
        const handleChangeInsert = (e) => {
            const {name, value} = e.target;
            setRecipeToInsert(prevState => ({
                ...prevState, [name]:value
            }))
        }

        const handleChangeUpdate = (e) => {
            const {name, value} = e.target;
            setRecipeToUpdate(prevState => ({
                ...prevState, [name]:value
            }))
        }

        //Insert modal
        const handleInsertModal = () => {
            setOpenInsertModal(!openInsertModal);
        }

        //Update modal
        const handleUpdateModal = () => {
            setOpenUpdateModal(!openUpdateModal);
        }

        //Delete modal
        const handleDeleteModal = () => {
            setOpenDeleteModal(!openDeleteModal);
        }


    //Function to handle the food that is being selected.
    const handleSelectedRecipe = (recipe, option) => {
        setRecipeToUpdate(recipe);
        (option === "Edit") ? setOpenUpdateModal(true):setOpenDeleteModal(true);
    }

    //Functions for the CRUD operations.
    const insertRecipe = async() => {
        if(recipeToInsert.Name === '' || recipeToInsert.IconPath === '' || recipeToInsert.GeneralDescription === ''
        || recipeToInsert.Nacionality === ''|| recipeToInsert.Difficulty === '' || recipeToInsert.Time === '' 
        || recipeToInsert.IngredientsList === '' || recipeToInsert.RecipeContent === ''){
            handleInsertModal();
            swal({
                title:"Campos vacíos",
                text:"No puedes una nueva receta si tienes algún campo requerido vacío.",
                icon:"error",
                buttons:"Cerrar"
            })
        }
        else{
            await axios.post("http://localhost:3001/api/createRecipe", recipeToInsert).then((response) => {
                handleInsertModal();
                swal({
                    title:"Receta creada",
                    text:"La receta fue correctamente creada",
                    icon:"success",
                    buttons:"Cerrar"
                })
            })

            setRecipeToInsert({
                Name:'',
                IconPath:'',
                GeneralDescription:'',
                Nacionality:'',
                Difficulty:'',
                Time:'',
                IngredientsList:'',
                RecipeContent:'',
                Url:''
            });
        }
    }

    const updateRecipe = async() => {
        if(recipeToUpdate.Name === '' || recipeToUpdate.IconPath === '' || recipeToUpdate.GeneralDescription === ''
        || recipeToUpdate.Nacionality === ''|| recipeToUpdate.Difficulty === '' || recipeToUpdate.Time === '' 
        || recipeToUpdate.IngredientsList === '' || recipeToUpdate.RecipeContent === ''){
            handleInsertModal();
            swal({
                title:"Campos vacíos",
                text:"No puedes actualizar esta receta si tienes algún requerido vacío.",
                icon:"error",
                buttons:"Cerrar"
            })
        }
        else{
            await axios.put("http://localhost:3001/api/updateRecipe", recipeToUpdate).then((response) => {
                handleUpdateModal();
                swal({
                    title:"Alimento actualizado",
                    text:"El alimento fue actualizado correctamente",
                    icon:"success",
                    buttons:"Cerrar"
                })
            })

            setRecipeToUpdate({
                IdRecipe:'',
                Name:'',
                IconPath:'',
                GeneralDescription:'',
                Nacionality:'',
                Difficulty:'',
                Time:'',
                IngredientsList:'',
                RecipeContent:'',
                Url:''
            });
        }
    }

    const deleteRecipe = async() => {
        await axios.delete(`http://localhost:3001/api/deleteRecipe/${recipeToUpdate.IdRecipe}`).then((response) => {
            handleDeleteModal();
            swal({
                title:"Receta eliminada",
                text:"La receta fue eliminada correctamente",
                icon:"success",
                buttons:"Cerrar"
            });
        });

        setRecipeToUpdate({
            IdRecipe:'',
            Name:'',
            IconPath:'',
            GeneralDescription:'',
            Nacionality:'',
            Difficulty:'',
            Time:'',
            IngredientsList:'',
            RecipeContent:'',
            Url:''
        });
    }



    //Modals implementation
    const insertModalBody = (
        <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Agregar receta</h3>
            <TextField name="Name" className={styles.inputMaterial} label="Nombre de la receta" onChange={handleChangeInsert}/>
            <br />
            <TextField name="IconPath" className={styles.inputMaterial} label="URL de imagen" onChange={handleChangeInsert}/>
            <br />
            <TextField name="GeneralDescription" className={styles.inputMaterial} label="Descripción general" onChange={handleChangeInsert}/>
            <br />
            <TextField name="Nacionality" className={styles.inputMaterial} label="Nacionalidad" onChange={handleChangeInsert}/>
            <br />
            <TextField name="Difficulty" className={styles.inputMaterial} label="Dificultad de preparación" onChange={handleChangeInsert}/>
            <br />
            <TextField name="Time" className={styles.inputMaterial} label="Tiempo de preparación" onChange={handleChangeInsert}/>
            <br />
            <TextField name="IngredientsList" className={styles.inputMaterial} label="Ingredientes" onChange={handleChangeInsert}/>
            <br />
            <TextField name="RecipeContent" className={styles.inputMaterial} label="Contenido de la receta" onChange={handleChangeInsert}/>
            <br />
            <TextField name="Url" className={styles.inputMaterial} label="URL de video (No requerido)" onChange={handleChangeInsert}/>
            <br /><br />
            <div align="right">
                <Button color="primary" onClick={() => insertRecipe()}>Insertar</Button>
                <Button onClick={() => handleInsertModal()}>Cancelar</Button>
            </div>
        </div>
    )

    const updateModalBody = (
        <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Actualizar receta</h3>
            <TextField name="Name" className={styles.inputMaterial} label="Nombre de la receta" onChange={handleChangeUpdate} value={recipeToUpdate && recipeToUpdate.Name}/>
            <br />
            <TextField name="IconPath" className={styles.inputMaterial} label="URL de imagen" onChange={handleChangeUpdate} value={recipeToUpdate && recipeToUpdate.IconPath}/>
            <br />
            <TextField name="GeneralDescription" className={styles.inputMaterial} label="Descripción general" onChange={handleChangeUpdate} value={recipeToUpdate && recipeToUpdate.GeneralDescription}/>
            <br />
            <TextField name="Nacionality" className={styles.inputMaterial} label="Nacionalidad" onChange={handleChangeUpdate} value={recipeToUpdate && recipeToUpdate.Nacionality}/>
            <br />
            <TextField name="Difficulty" className={styles.inputMaterial} label="Dificultad de preparación" onChange={handleChangeUpdate} value={recipeToUpdate && recipeToUpdate.Difficulty}/>
            <br />
            <TextField name="Time" className={styles.inputMaterial} label="Tiempo de preparación" onChange={handleChangeUpdate} value={recipeToUpdate && recipeToUpdate.Time}/>
            <br />
            <TextField name="IngredientsList" className={styles.inputMaterial} label="Ingredientes" onChange={handleChangeUpdate} value={recipeToUpdate && recipeToUpdate.IngredientsList}/>
            <br />
            <TextField name="RecipeContent" className={styles.inputMaterial} label="Contenido de la receta" onChange={handleChangeUpdate} value={recipeToUpdate && recipeToUpdate.RecipeContent}/>
            <br />
            <TextField name="Url" className={styles.inputMaterial} label="URL de video (No requerido)" onChange={handleChangeUpdate} value={recipeToUpdate && recipeToUpdate.Url}/>
            <br /><br />
            <div align="right">
                <Button color="primary" onClick={() => updateRecipe()}>Actualizar</Button>
                <Button onClick={() => handleUpdateModal()}>Cancelar</Button>
            </div>
        </div>
    )

    const deleteModalBody = (
        <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Eliminar receta</h3>
            <p className={styles.deleteModalText}>¿Estás seguro de que quieres eliminar la receta: {recipeToUpdate.Name}?</p>
            <div align="right">
                <Button color="secondary" onClick={() => deleteRecipe()}>Sí, quiero eliminar</Button>
                <Button onClick={() => handleDeleteModal()}>Detener operación</Button>
            </div>
        </div>
    )

    return(
        <>
            <div className='foods-table-title'><h1>Administración de recetas</h1></div>
            <Button variant="contained" className={styles.buttonInsert} onClick={() => handleInsertModal()}>Agregar una nueva receta</Button>
            <div className="table-zone">
                <TableContainer>
                        <Table className={styles.table}>
                            <TableHead className={styles.tHead}>
                                <TableRow>
                                    {tableHeads.map((tableHead) => {
                                        return (
                                            <TableCell key={tableHead.id} className={styles.tHeadFont}>{tableHead.label}</TableCell>
                                        )
                                    })}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {recipesAfterPagingAndSorting().map(recipe => (
                                    <TableRow key={recipe.IdRecipe}>
                                        <TableCell>{recipe.Name}</TableCell>
                                        <TableCell>{recipe.Nacionality}</TableCell>
                                        <TableCell>{recipe.Difficulty}</TableCell>
                                        <TableCell>{recipe.Time}</TableCell>
                                        <TableCell><Edit className={styles.icons} onClick={() => handleSelectedRecipe(recipe, "Edit")}/> &nbsp;&nbsp;&nbsp; <Delete className={styles.icons} onClick={() => handleSelectedRecipe(recipe, "Delete")}/></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                </TableContainer>
                <TablePagination component="div" page={page} rowsPerPageOptions={pages}
                 rowsPerPage={rowsPerPage} count={avRecipes.length} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage}/>
                <Modal open={openInsertModal} onClose={() => handleInsertModal()}>{insertModalBody}</Modal>
                <Modal open={openUpdateModal} onClose={() => handleUpdateModal()}>{updateModalBody}</Modal>
                <Modal open={openDeleteModal} onClose={() => handleDeleteModal()}>{deleteModalBody}</Modal>
            </div>
        </>
    )
}

export default RecipesTable;