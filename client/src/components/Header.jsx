import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';
import { Link } from 'react-router-dom';
import AuthService from '../utils/auth';


export default function Header() {
    const logout = (event) => {
        event.preventDefault();
        AuthService.logout();
    };

    const isLoggedIn = AuthService.loggedIn();


    return (
        <div className="container-fluid">
            <div className="row align-items-center justify-content-between">
                <div className="col-auto img">
                    <Link to='/home'>
                        <img src="./logo.png" alt="logo" />
                    </Link>
                </div>
                <div className="col-auto sign">
                    {isLoggedIn ? (
                        <button onClick={logout}>Logout</button>
                    ) : (
                        <>
                            <Link to="/signUp">
                                <button>Sign Up</button>
                            </Link>
                            <Link to="/Login">
                                <button>Login</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}