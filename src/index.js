import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App';
import Welcome from './Welcome';

ReactDOM.render(
  <App isLoggedIn = {false} />,
  document.getElementById('root')
);