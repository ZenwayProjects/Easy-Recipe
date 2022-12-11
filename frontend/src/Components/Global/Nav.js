import logo from "../Images/logo.png";
import '../Css/Global/Nav.css';
import ham from "../Images/ham-negro.png";
import { useHistory } from 'react-router-dom';

const Nav = ({openCategory, setOpenCategory}) => {

  let history = useHistory();

    function openAside(){
     
      setOpenCategory({
        ...openCategory,
        open: !openCategory.open
      })
    }

    return (
      

        <div style={{height:"70px"}}>
          <header className="nav">

            <div className="left">
              <img alt="Logo EasyRecipe" className="logo" src={logo} onClick={() => {history.push('/')}}/>
              <div className="title-container">
                <span className="title">Easy Recipe</span>
              </div>
            </div>
            
            
            <div className="right">
              <label className="logo-ham" onClick={()=>openAside()}>
                <img alt="Menu desplegable Categorias" className="logo-ham-img"src={ham}></img >
              </label>
            </div>
              
            <div className="center">
              <div class="link-user-manual" onClick={() => {history.push('/user-manual')}}>
                <span>¿Cómo usar Easy Recipe?</span>
              </div>
            </div>
          </header>
        </div>              
     );
}
 
export default Nav;