import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Title from './components/Title';
import Navbar from "./components/navbar.component"
import FoodsList from "./components/foods-list.component";
import EditFood from "./components/edit-food.component";
import CreateFood from "./components/create-food.component";
import CreateUser from "./components/create-user.component";

function Homepage(){
    return(
        <div className="container">
            <Router>
                <Title />
                <Navbar />
                <br/>
                <Switch>
                    <Route path="/foodslist" exact component={FoodsList} />
                    <Route path="/edit/:id" component={EditFood} />
                    <Route path="/create" component={CreateFood} />
                    <Route path="/user" component={CreateUser} />
                </Switch>
            </Router>
        </div>
    );
}


export default Homepage