import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/Homepage" className="navbar-brand">Nutrifficient</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/foodslist" className="nav-link">Nutrient Tracker</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Food Available</Link>
          </li>
          <li className = "navbar-item">
          <Link to = "/Homepage" className="nav-link">Suggestions</Link>
          </li>
          <li>
            <Link to ="/deficiency" className = "nav-link">Deficiencies</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Edit Profile</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}