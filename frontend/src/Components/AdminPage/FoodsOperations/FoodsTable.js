import './Styles/FoodsTable.css';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, TablePagination, Modal, Button, TextField, Select, InputLabel, MenuItem} from '@material-ui/core';
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


const FoodsTable = () => {

    const styles = useStyles();

    //Table configuration(paging, filtering)
        //Object to define table head cells
        const tableHeads = [
            {
                id: 1, 
                label:"Nombre del alimento"
            },
            {
                id: 2, 
                label:"Categoría"
            },
            {
                id: 3, 
                label:"Operaciones"
            }
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

        const foodsAfterPagingAndSorting = () => {
            return (
                avFoods.slice(page*rowsPerPage, (page+1)*rowsPerPage)
            )
        }


    //Function to bring the data from the database
    const [avFoods, setAvFoods] = useState([]);
    const getAvailableFoods = async () => {
        await axios.get("http://localhost:3001/api/getAvailableFoods").then((response) => {
            const foodData = response.data;
            setAvFoods(foodData)
        })
    }

    const [avCategories, setAvCategories] = useState([]);
    const getAvailableCategories = async() => {
        await axios.get("http://localhost:3001/api/getCategories").then((response) => {
            const categoriesData = response.data;
            setAvCategories(categoriesData);
        })
    }

    //useEffects
    useEffect(() => {
        getAvailableFoods();
        getAvailableCategories();
    },[])

    useEffect(() => {
        getAvailableFoods();
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
        const [foodToInsert, setFoodToInsert] = useState({
            Name:'',
            IconPath:'',
            IdCategory:''
        })
        //Satate to handle the food insertion
        const [foodToUpdate, setFoodToUpdate] = useState({
            id:'',
            name:'',
            path:'',
            categoryId:'',
            categoryName:''
        })

    
    //Functions to control the modals
        
        //Handle input changes
        const handleChangeInsert = (e) => {
            const {name, value} = e.target;
            setFoodToInsert(prevState => ({
                ...prevState, [name]:value
            }))
        }

        const handleChangeUpdate = (e) => {
            const {name, value} = e.target;
            setFoodToUpdate(prevState => ({
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
    const handleSelectedFood = (food, option) => {
        const valuesToUpdate = {
            id:food.IdFood,
            name:food.Name,
            path:food.IconPath,
            categoryId:food.IdCategory,
            categoryName:food.Category
        }
        setFoodToUpdate(valuesToUpdate);
        (option === "Edit") ? setOpenUpdateModal(true):setOpenDeleteModal(true);
    }

    //Functions for the CRUD operations.
    const insertFood = async() => {
        console.log(foodToInsert);
        if(foodToInsert.Name === '' || foodToInsert.IconPath === '' || foodToInsert.IdCategory === ''){
            handleInsertModal();
            swal({
                title:"Campos vacíos",
                text:"No puedes agregar alimentos si tienes algún campo vacío.",
                icon:"error",
                buttons:"Cerrar"
            })
        }
        else{
            await axios.post("http://localhost:3001/api/createNewFood", foodToInsert).then((response) => {
                handleInsertModal();
                swal({
                    title:"Alimento creado",
                    text:"El alimento fue correctamente creado",
                    icon:"success",
                    buttons:"Cerrar"
                })
            })

            setFoodToInsert({
                Name:'',
                IconPath:'',
                IdCategory:''
            });
        }
    }

    const updateFood = async() => {
        if(foodToUpdate.name === '' || foodToUpdate.path === '' || foodToUpdate.categoryName === ''){
            handleUpdateModal();
            swal({
                title:"Campos vacíos",
                text:"No puedes acrualizar el alimento si tienes algún campo vacío.",
                icon:"error",
                buttons:"Cerrar"
            })
        }
        else{
            await axios.put("http://localhost:3001/api/updateFood", foodToUpdate).then((response) => {
                handleUpdateModal();
                swal({
                    title:"Alimento actualizado",
                    text:"El alimento fue actualizado correctamente",
                    icon:"success",
                    buttons:"Cerrar"
                })
            })

            setFoodToUpdate({
                id:'',
                name:'',
                path:'',
                categoryId:'',
                categoryName:''
            });
        }
    }

    const deleteFood = async() => {
        await axios.delete(`http://localhost:3001/api/deleteFood/${foodToUpdate.id}`).then((response) => {
            handleDeleteModal();
            swal({
                title:"Alimento eliminado",
                text:"El alimento fue eliminado correctamente",
                icon:"success",
                buttons:"Cerrar"
            });
        });

            setFoodToUpdate({
                id:'',
                name:'',
                path:'',
                categoryId:'',
                categoryName:''
            });
    }



    //Modals implementation
    const insertModalBody = (
        <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Agregar alimento</h3>
            <TextField name="Name" className={styles.inputMaterial} label="Nombre del alimento" onChange={handleChangeInsert}/>
            <br />
            <TextField name="IconPath" className={styles.inputMaterial} label="URL de imagen" onChange={handleChangeInsert}/>
            <br /><br />
            <InputLabel>Categoría a la que pertenece</InputLabel>
            <Select name="IdCategory" className={styles.select} labelId='ca-sel' id='category-selection' value={foodToInsert.IdCategory} onChange={handleChangeInsert}>
                {avCategories.map((category) => (
                    <MenuItem key={category.IdCategory} value={category.IdCategory}>{category.Name}</MenuItem>
                ))}
            </Select>
            <br /><br />
            <div align="right">
                <Button color="primary" onClick={() => insertFood()}>Insertar</Button>
                <Button onClick={() => handleInsertModal()}>Cancelar</Button>
            </div>
        </div>
    )

    const updateModalBody = (
        <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Actualizar alimento</h3>
            <TextField name="name" className={styles.inputMaterial} label="Nombre del alimento" onChange={handleChangeUpdate} value={foodToUpdate && foodToUpdate.name}/>
            <br />
            <TextField name="path" className={styles.inputMaterial} label="URL de imagen" onChange={handleChangeUpdate} value={foodToUpdate && foodToUpdate.path}/>
            <br /><br />
            <InputLabel>Categoría a la que pertenece</InputLabel>
            <Select name="categoryId" className={styles.select} labelId='ca-sel' id='category-selection' value={foodToUpdate && foodToUpdate.categoryId} onChange={handleChangeUpdate}>
                {avCategories.map((category) => (
                    <MenuItem key={category.IdCategory} value={category.IdCategory}>{category.Name}</MenuItem>
                ))}
            </Select>
            <br /><br />
            <div align="right">
                <Button color="primary" onClick={updateFood}>Actualizar</Button>
                <Button onClick={() =>handleUpdateModal()}>Cancelar</Button>
            </div>
        </div>
    )

    const deleteModalBody = (
        <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Eliminar alimento</h3>
            <p className={styles.deleteModalText}>¿Estás seguro de que quieres eliminar el alimento: {foodToUpdate.name}?</p>
            <div align="right">
                <Button color="secondary" onClick={() => deleteFood()}>Sí, quiero eliminar</Button>
                <Button onClick={() => handleDeleteModal()}>Detener operación</Button>
            </div>
        </div>
    )

    return(
        <>
            <div className='foods-table-title'><h1>Administración de alimentos</h1></div>
            <Button variant="contained" className={styles.buttonInsert} onClick={() => handleInsertModal()}>Agregar un nuevo alimento</Button>
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
                                {foodsAfterPagingAndSorting().map(food => (
                                    <TableRow key={food.IdFood}>
                                        <TableCell>{food.Name}</TableCell>
                                        <TableCell>{food.Category}</TableCell>
                                        <TableCell><Edit className={styles.icons} onClick={() => handleSelectedFood(food, "Edit")}/> &nbsp;&nbsp;&nbsp; <Delete className={styles.icons} onClick={() => handleSelectedFood(food, "Delete")}/></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                </TableContainer>
                <TablePagination component="div" page={page} rowsPerPageOptions={pages}
                 rowsPerPage={rowsPerPage} count={avFoods.length} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage}/>
                <Modal open={openInsertModal} onClose={() => handleInsertModal()}>{insertModalBody}</Modal>
                <Modal open={openUpdateModal} onClose={() => handleUpdateModal()}>{updateModalBody}</Modal>
                <Modal open={openDeleteModal} onClose={() => handleDeleteModal()}>{deleteModalBody}</Modal>
            </div>
        </>
    )
}

export default FoodsTable;