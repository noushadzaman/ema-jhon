import React from 'react';
import logo from '../../../images/Logo.svg';
import './Header.css';

const Header = () => {
    return (
        <nav className='header'>
            <img src={logo} alt='' />
            <div className=''>
                <a href='/Order'>Order</a>
                <a href='/review'>Review</a>
                <a href='/inventory'>Inventory</a>
                <a href='/Login'>Login</a>
            </div>
        </nav>
    );
};

export default Header;