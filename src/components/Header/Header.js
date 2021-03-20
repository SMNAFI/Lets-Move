import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header-container">
            <div className="header-logo">
                <h1>LET'S MOVE</h1>
            </div>
            <div className="nav">
                <ul>
                    <li><Link to='/home' className='anchor'>Home</Link></li>
                    <li><Link to='/booking/bus' className='anchor'>Destination</Link></li>
                    <li><Link to='/' className='anchor'>Blog</Link></li>
                    <li><Link to='/' className='anchor'>Contact</Link></li>
                    {
                        loggedInUser.name ?
                            <li><Link to='/' className='anchor user-name'>{loggedInUser.name}</Link></li>
                            : <li><Link to='/login' className='anchor'>
                                <span className='login-btn'>Login</span>
                            </Link></li>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Header;