import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './components/App/App';


ReactDOM.render(
  <App isLoggedIn = {false} />,
  document.getElementById('root')
);