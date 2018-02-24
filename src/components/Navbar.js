import React from 'react';
import Link from 'gatsby-link';
import elephant from '../media/binkies-elephant.svg';

const Navbar = () => (
    <div className="navbar">
        <div className="container">
            <h1 style={{margin: '2rem 0 0 0', fontSize: '28px'}}>
                <Link to="/" className="navbar-item">
                    <img src={elephant} alt="Binkies & Babies" width="60" className="logo-img" />
                    <span className="logo-name">Binkies &amp; Babies</span>
                </Link>            
            </h1>
        </div>
    </div>
);

export default Navbar;
