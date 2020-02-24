import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import history from './history';
import "bootstrap/dist/css/bootstrap.min.css";


import Welcome from "./Welcome";
import Homepage from "./Homepage";


const routes = (
    <Router history={history}>                          
        <Route path="/" component= {Welcome} />
        <Route path="/homepage" component= {Homepage} />
    </Router>
)
//took out switch from router


class App extends React.Component{
    render() {
        return (
            <div className = "app-routes">
               {routes}
            </div>
        );
    }
}
 
export default App;