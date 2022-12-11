import './Css/RolePage.css';
import { Link } from 'react-router-dom';


const RolePage = () =>{

    return(
        <>
            <div className="role-page-content">
                <Link to={{pathname:"/login-admin"}}>
                    <div className='column admin'>
                        <div className='text-container'>
                            <h1 className='text'>Soy administrador</h1>
                        </div>
                    </div>
                </Link>
                
                <Link to={{pathname:"/homepage"}}>
                    <div className='column user'>
                        <div className='text-container'>
                            <h1 className='text'>Soy usuario</h1>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default RolePage;