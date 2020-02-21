import React from 'react';
import ReactDOM from 'react-dom';
import LoginBox from './components/LoginBox/LoginBox';
import RegisterBox from './components/RegisterBox/RegisterBox';
import "./Welcome.css";

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
      <div className = "root-container">
        <div className = "box-container">
          {this.state.isLoginOpen && <LoginBox />}
          {this.state.isRegisterOpen && <RegisterBox />}
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
        </div>
      </div>
    );
  }
}

export default Welcome;