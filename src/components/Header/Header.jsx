import React, { useContext } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Header = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(result => { })
            .catch(error => { console.log(error) })
    }

    return (
        <nav className='header'>
            <img src='Logo.svg' alt='' />
            <div className=''>
                <Link to='/'>Shop</Link>
                <Link to='/Orders'>Orders</Link>
                <Link to='/inventory'>Inventory</Link>
                <Link to='/Login'>Login</Link>
                <Link to='/signup'>Sign Up</Link>
                {
                    user && <span className='profile-email'>{user.email}<button className='sign-out-btn' onClick={handleLogout}>log Out</button></span>
                }
            </div>
        </nav>
    );
};

export default Header;