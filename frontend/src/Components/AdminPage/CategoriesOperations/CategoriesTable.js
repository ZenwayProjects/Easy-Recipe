import './Styles/CategoriesTable.css';
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
    select:{
        width:'200px'
    },
    deleteModalText:{
        color:'black'
    }
}));


const CategoriesTable = () => {

    const styles = useStyles();

    //Table configuration(paging, filtering)
        //Object to define table head cells
        const tableHeads = [
            {
                id: 1, 
                label:"Nombre de la categoría"
            },
            {
                id: 3, 
                label:"Operaciones"
            }
        ]

        //Table paging
        const pages = [5, 10, 15];
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(pages[page])

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        }

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        }

        const categoriesAfterPagingAndSorting = () => {
            return (
                avCategories.slice(page*rowsPerPage, (page+1)*rowsPerPage)
            )
        }


    //Function to bring the data from the database
    const [avCategories, setAvCategories] = useState([]);
    const getAvailableCategories = async() => {
        await axios.get("http://localhost:3001/api/getCategories").then((response) => {
            const categoriesData = response.data;
            setAvCategories(categoriesData);
        })
    }

    //useEffect to bring the foods every time the module is loaded.
    useEffect(() => {
        getAvailableCategories();
    })



    //States configuration

        //Insert modal
        //State to control the insert modal
        const [openInsertModal, setOpenInsertModal] = useState(false);
        //Satate to handle the category insertion
        const [categoryToInsert, setCategoryToInsert] = useState({
            Name:'',
            IconPath:''
        });
        

        //Update modal
        //State to control the update modal
        const [openUpdateModal, setOpenUpdateModal] = useState(false);
        //State to control the delete modal
        const [openDeleteModal, setOpenDeleteModal] = useState(false);
        //Satate to handle the category update
        const [categoryToUpdate, setCategoryToUpdate] = useState({
            IdCategory:'',
            Name:'',
            IconPath:''
        });


    
    //Functions to control the modals
        
        //Handle input changes
        const handleChangeInsert = (e) => {
            const {name, value} = e.target;
            setCategoryToInsert(prevState => ({
                ...prevState, [name]:value
            }))
        }
        const handleChangeUpdate = (e) => {
            const {name, value} = e.target;
            setCategoryToUpdate(prevState => ({
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
    const handleSelectedCategory = (category, option) => {
        setCategoryToUpdate(category);
        (option === 'Edit') ? setOpenUpdateModal(true):setOpenDeleteModal(true)
    }

    //Functions for the CRUD operations.
    const insertCategory = async() => {
        if(categoryToInsert.Name === '' || categoryToInsert.IconPath === ''){
            handleInsertModal();
            swal({
                title:"Campos vacíos",
                text:"No puedes crear categorías si tienes algún campo vacío.",
                icon:"error",
                buttons:"Cerrar"
            })
        }
        else{
            await axios.post("http://localhost:3001/api/createCategory", categoryToInsert).then((response) => {
                handleInsertModal();
                swal({
                    title:"Categoría creada",
                    text:"La categoría se creó correctamente",
                    icon:"success",
                    buttons:"Cerrar"
                });
                setCategoryToInsert({
                    IdCategory:'',
                    Name:'',
                    IconPath:''
                })
            });
        }
    }

    const updateCategory = async() => {
        if(categoryToUpdate.Name === '' || categoryToUpdate.IconPath === ''){
            handleUpdateModal();
            swal({
                title:"Campos vacíos",
                text:"No puedes actualizar categorías si tienes algún campo vacío.",
                icon:"error",
                buttons:"Cerrar"
            })
        }
        else{
            await axios.put("http://localhost:3001/api/updateCategory", categoryToUpdate).then((response) => {
                handleUpdateModal();
                swal({
                    title:"Categoría actualizada",
                    text:"La categoría se actualizó correctamente",
                    icon:"success",
                    buttons:"Cerrar"
                });
                setCategoryToUpdate({
                    Id:'',
                    Name:'',
                    IconPath:''
                });
            });
        }
    }

    const deleteCategory = async() => {
        await axios.delete(`http://localhost:3001/api/deleteCategory/${categoryToUpdate.IdCategory}`).then((response) => {
                console.log(response.data);
                handleDeleteModal();
                swal({
                    title:"Categoría eliminada",
                    text:"La categoría se eliminó correctamente",
                    icon:"success",
                    buttons:"Cerrar"
                });
                setCategoryToUpdate({
                    Id:'',
                    Name:'',
                    IconPath:''
                });
            });
    }


    //Modals implementation
    const insertModalBody = (
        <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Agregar categoría</h3>
            <TextField name="Name" className={styles.inputMaterial} label="Nombre de la categoría" onChange={handleChangeInsert}/>
            <br />
            <TextField name="IconPath" className={styles.inputMaterial} label="Url de imagen" onChange={handleChangeInsert}/>
            <br /><br />
            <div align="right">
                <Button color="primary" onClick={() => insertCategory()}>Insertar</Button>
                <Button onClick={() => handleInsertModal()}>Cancelar</Button>
            </div>
        </div>
    )

    const updateModalBody = (
        <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Actualizar categoría</h3>
            <TextField name="Name" className={styles.inputMaterial} label="Nombre de la categoría" onChange={handleChangeUpdate} value={categoryToUpdate && categoryToUpdate.Name}/>
            <br />
            <TextField name="IconPath" className={styles.inputMaterial} label="Url de imagen" onChange={handleChangeUpdate} value={categoryToUpdate && categoryToUpdate.IconPath}/>
            <br /><br />
            <div align="right">
                <Button color="primary" onClick={() => updateCategory()}>Insertar</Button>
                <Button onClick={() => handleUpdateModal()}>Cancelar</Button>
            </div>
        </div>
    )

    const deleteModalBody = (
        <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Eliminar categoría</h3>
            <p className={styles.deleteModalText}>¿Estás seguro de que quieres eliminar la categoría {categoryToUpdate.Name}?</p>
            <div align="right">
                <Button color="secondary" onClick={() => deleteCategory()}>Sí, quiero eliminar</Button>
                <Button onClick={() => handleDeleteModal()}>Detener operación</Button>
            </div>
        </div>
    )

    return(
        <>
            <div className='categories-table-title'><h1>Administración de categorías</h1></div>
            <Button variant="contained" className={styles.buttonInsert} onClick={() => handleInsertModal()}>Agregar una nueva categoría</Button>
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
                                {categoriesAfterPagingAndSorting().map(category => (
                                    <TableRow key={category.IdCategory}>
                                        <TableCell>{category.Name}</TableCell>
                                        <TableCell><Edit className={styles.icons} onClick={() => {handleSelectedCategory(category,'Edit')}}/> &nbsp;&nbsp;&nbsp; <Delete className={styles.icons} onClick={() => {handleSelectedCategory(category,'Delete')}}/></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                </TableContainer>
                <TablePagination component="div" page={page} rowsPerPageOptions={pages}
                 rowsPerPage={rowsPerPage} count={avCategories.length} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage}/>
                <Modal open={openInsertModal} onClose={() => handleInsertModal()}>{insertModalBody}</Modal>
                <Modal open={openUpdateModal} onClose={() => handleUpdateModal()}>{updateModalBody}</Modal>
                <Modal open={openDeleteModal} onClose={() => handleDeleteModal()}>{deleteModalBody}</Modal>
            </div>
        </>
    )
}

export default CategoriesTable;