import React from 'react';
import logo from '../../assets/paracosm.png';
import './Home.css';
//import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="App"> 
            <header className="App-header">
                <div className="App-paracosm">
                {/* Logo */}
                    <a className="App-logo" target='_blank' rel="noopener noreferrer" href="https://paracosm.io">
                        <img className="paracosm-logo" src={logo} />
                        <i className="fas fa-external-link-alt external-link" data-fa-transform="up-6"></i>
                    </a>
                <p>
                    This is our app.
                </p>
                </div>
                <div className= "App-UserEntry">
                    <form>   
                        <label>
                            Username:
                        <input type="text" name = "username"/>
                        </label>
                    </form>
                </div>
                <div className= "App-PassEntry">
                    <form>   
                        <label>
                            Password:
                        <input type="text" name = "username"/>
                        </label>
                    </form>
                </div>
            </header>
        </div> 
    );
}

export default Home;
