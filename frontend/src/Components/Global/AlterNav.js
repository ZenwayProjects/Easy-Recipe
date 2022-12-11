import logo from "../Images/logo.png";
import '../Css/Global/AlterNav.css';
import { useHistory } from 'react-router-dom';

const AlterNav = () => {

  let history = useHistory();

    return (

        <div style={{height:"70px"}}>
          <header className="nav">
            <div className="left">
              <img  className="logo" src={logo} onClick={() => {history.push('/')}}/>
              <div className="title-container"><span className="title">Easy Recipe</span></div>
            </div>
          </header>
        </div>
     );
}
 
export default AlterNav;