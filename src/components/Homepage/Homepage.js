import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./navbar.component"
import FoodsList from "./foods-list.component";
import EditFood from "./edit-food.component";
import CreateFood from "./create-food.component";
import CreateUser from "./create-user.component";

function Homepage(){
    return(
        <div className="container">
            <Router>
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