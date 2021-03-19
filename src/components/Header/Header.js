import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <div className="header-container body-container">
            <div className="header-logo">
                <h1>LET'S GO</h1>
            </div>
            <div className="nav">
                <Link to='/home' className='anchor'>Home</Link>
                <Link to='/' className='anchor'>Destination</Link>
                <Link to='/' className='anchor'>Blog</Link>
                <Link to='/' className='anchor'>Contact</Link>
                <Link to='/login' className='anchor'>
                    <button className='login-btn'>Login</button>
                </Link>
            </div>
        </div>
    );
};

export default Header;