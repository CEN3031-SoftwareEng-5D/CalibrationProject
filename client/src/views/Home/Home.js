import React, { Component } from "react";
import {BrowserRouter as Router, Link, Navlink} from 'react-router-dom'
import logo from '../../assets/paracosm.png';
import './Home.css';
import SigninComponent from'../Register/SigninComponent';
//import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    render() {
        return (
          <div className="Main-Page">
            <a className="Logo" target='_blank' rel="noopener noreferrer" href="https://paracosm.io">
                <img className="paracosm-logo" src={logo} />
                <i className="fas fa-external-link-alt external-link" data-fa-transform="up-6"></i>
            </a>
            <SigninComponent/>
            {/* <text>Username</text>
            <p><input type="text" name="E-MAIL" id="E-MAIL" /></p>
            <text>Password</text>
            <p><input type="text" name="Password" id="Password" /></p>
            <text>UUID</text>
            <p><input type="text" name="UUID" id="UUID" /></p>
            <a class="Buttons">
              <Link to="/Upload">
                <button class="loginButton" type="button">
                  Login
                </button>
              </Link>
              <Link to="/Register">
                <button class="registerButton" type="button">
                  Register
                </button>
              </Link>
            </a> */}
          </div>
        );
    }
}

export default Home;
