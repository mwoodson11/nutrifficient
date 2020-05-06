import React from 'react';
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";


import Welcome from "../Welcome/Welcome";
import Homepage from "../Homepage/Homepage";


class App extends React.Component{
    constructor(props) {
        super(props);
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.state = {
            isLoggedIn: false
        };
    }

    onChangeLogin(e) {
        this.setState({isLoggedIn: e.target.value});
    }

    render() {
        if (this.props.isLoggedIn) {
            return (
            <Router>
                {/* <Route path = "/Homepage" component = {Homepage} /> */}
                <Route
                        path='/info'
                        render={(props) => <Homepage {...props} username={this.props.username} />}
                    />
                <Redirect to = "/info" />
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