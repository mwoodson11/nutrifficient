import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './components/App/App';
import Welcome from './components/Welcome/Welcome';

ReactDOM.render(
  <App isLoggedIn = {false} />,
  document.getElementById('root')
);