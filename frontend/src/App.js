import React from 'react';
import './App.css';

import RolePage from './Pages/RolePage/RolePage';

import LoginAdminPage from './Pages/AdminPage/LoginAdminPage';
import RegisterAdminPage from './Pages/AdminPage/RegisterAdminPage';
import AdminLogged from './Pages/AdminPage/AdminLogged';
import SelectOperation from './Pages/AdminPage/Operations/SelectOperation/SelectOperation';
import RecipesOperations from './Pages/AdminPage/Operations/RecipesOperations';
import CategoriesOperations from './Pages/AdminPage/Operations/CategoriesOperations';
import AvailableFoodsOperations from './Pages/AdminPage/Operations/AvailableFoodsOperations';

import HomePage from './Pages/Home/HomePage';
import RecipesPage from './Pages/Recipes/RecipesPage';
import SelectedRecipePage from './Pages/SelectedRecipe/SelectedRecipePage';

import UserManual from './Components/UserManual/UserManual';

import ModuleNotFound from './Pages/ModuleNotFound/ModuleNotFound';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

class App extends React.Component{

  render(){
    return(
      <div className="App">
        <Router>
          <Switch>
            {/* Initial page */}
            <Route path="/role-selection" component={RolePage}/> 

            {/* Admin login/register pages */}
            <Route path="/login-admin" component={LoginAdminPage}/> 
            <Route path="/register-admin" component={RegisterAdminPage}/> 
            <Route path="/admin-logged" component={AdminLogged}/>
            {/* Admin operations pages */}
            <Route path="/select-operation" component={SelectOperation}/>
            <Route path="/recipes-operations" component={RecipesOperations}/>
            <Route path="/categories-operations" component={CategoriesOperations}/>
            <Route path="/foods-operations" component={AvailableFoodsOperations}/>

            {/* User pages */}
            <Route path="/homepage" component={HomePage}/> 
            <Route path="/recipes" component={RecipesPage}/>
            <Route path="/selected-recipe" component={SelectedRecipePage}/>

            {/* Initial page */}
            <Route path="/user-manual" component={UserManual}/>
            <Redirect exact from = "/" to="/role-selection"/>

            <Route path="*" component={ModuleNotFound}/>
          </Switch>
        </Router>
      </div> 
    );
  }

}

export default App;
