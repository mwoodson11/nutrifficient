import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Title from './components/Title';
import Navbar from "./components/navbar.component"
import FoodsList from "./components/foods-list.component";
import EditFood from "./components/edit-food.component";
import CreateFood from "./components/create-food.component";
import CreateUser from "./components/create-user.component";

 
function App() {
 return (
    <Router>
        <div className="container">
            <Title />
            <Navbar />
            <br/>
            <Route path="/" exact component={FoodsList} />
            <Route path="/edit/:id" component={EditFood} />
            <Route path="/create" component={CreateFood} />
            <Route path="/user" component={CreateUser} />
        </div>
    </Router>
 );
}
 
export default App;