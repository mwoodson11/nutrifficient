import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./navbar.component"
import FoodsList from "./foods-list.component";
import EditFood from "./edit-food.component";
import FoodAvailable from "./FoodAvailable";
import CreateUser from "./create-user.component";

function Homepage(property){
    return(
        <div className="container">
            <Router>
                <Navbar />
                <br/>
                <Switch>
                    <Route
                        path='/foodslist'
                        render={(props) => <FoodsList {...props} username={property.username} />}
                    />
                    <Route path="/edit/:id" component={EditFood} />
                    {/* <Route path="/create" component={FoodAvailable} /> */}
                    <Route
                        path='/create'
                        render={(props) => <FoodAvailable {...props} username={property.username} />}
                    />
                    {/* <Route path="/user" component={CreateUser} /> */}
                    <Route
                        path='/user'
                        render={(props) => <CreateUser {...props} username={property.username} />}
                    />
                </Switch>
            </Router>
        </div>
    );
}


export default Homepage