import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './components/App/App';
import {Provider} from 'react-redux';
import {createStore, applyMiddlware, compose} from 'redux';
import reduxThunk from 'redux-thunk';
import RequireAuth from './components/require_auth';
import reducers from './reducers';

const createStoreWithMiddleware = compose(applyMiddlwear(reduxThunk))(createStore);


ReactDOM.render(
  <App isLoggedIn = {false} />,
  document.getElementById('root')
);