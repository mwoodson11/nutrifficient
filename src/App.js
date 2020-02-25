import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import "bootstrap/dist/css/bootstrap.min.css";


import Welcome from "./Welcome";
import Homepage from "./Homepage";


const routes = (
    <Router history={history}>                          
        <Route path="/" component= {Welcome} />
        <Route path="/Homepage" component= {Homepage} />
    </Router>
)
//took out switch from router


class App extends React.Component{
    constructor(props) {
        super(props);
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.isLoggedIn = false;
        this.state = {
            isLoggedIn: false
        };
    }

    onChangeLogin(e) {
        this.setState({isLoggedIn: e.target.value});
    }

    render() {
        if (this.isLoggedIn) {
            return (
            <Router>
                <Route path = "/Homepage" component = {Homepage} />
                <Redirect to = "/Homepage" />
            </Router>
            );
        } else {
            return (
                <Router>
                <Route path = "/" component = {Welcome}/>
                <Redirect to ="/" />
                </Router>
                 );
            }
    }
}
 
export default App;