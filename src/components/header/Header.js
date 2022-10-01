import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header class="container">
            <div className='logo-box'>
                <p>Logo here</p>
            </div>
            <div className='header-links'>
                <p>Home</p>
                <p>Shop</p>
            </div>
        </header>
    );
};

export default Header;