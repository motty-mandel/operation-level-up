import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="container-fluid">
            <div className="row align-items-center justify-content-between">
                <div className="col-auto img">
                    <Link to='/'>
                    <img src="./logo.png" alt="logo" />
                    </Link>
                </div>
                <div className="col-auto sign">
                    <Link to="/signUp">
                    <button>Sign Up</button>
                    </Link>
                    <Link to="/Login">
                    <button>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}