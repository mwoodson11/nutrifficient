import React from 'react';
import ReactDOM from 'react-dom';
import LoginBox from '../LoginBox/LoginBox';
import RegisterBox from '../RegisterBox/RegisterBox';
import "./Welcome.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from '../App/App';
import Logo from '../images/logo.png';

class Welcome extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      isLoginOpen : true,
      isRegisterOpen : false
    };
  }

  showLoginBox() {
    this.setState({isLoginOpen : true, isRegisterOpen : false});
  }

  showRegisterBox() {
    this.setState({isLoginOpen : false, isRegisterOpen : true});
  }


  render() {
    return (
      <Router>
      <div className = "root-container">
        <div className = "box-container">
        <img src = {Logo} />
          <div className = "box-controller">
            <div className = {"controller " + (this.state.isLoginOpen ? "selected-controller" : "")}
              onClick = {this.showLoginBox.bind(this)}>
              Login 
            </div>
            <div className = {"controller " + (this.state.isRegisterOpen ? "selected-controller" : "")}
              onClick = {this.showRegisterBox.bind(this)}>
              Register
             </div> 
          </div> 
          {this.state.isLoginOpen && <LoginBox />}
          {this.state.isRegisterOpen && <RegisterBox />}
        </div>
      </div>
      </Router>
    );
  }
}

export default Welcome;