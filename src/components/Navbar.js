import React from 'react';
import Link from 'gatsby-link';

const Navbar = () => (
    <div className="navbar">
        <div className="container">
            <h1 style={{margin: '1rem 0 0 0', fontSize: '28px'}}>
                <Link to="/" className="navbar-item">
                    Binkies &amp; Babies
                </Link>            
            </h1>
        </div>
    </div>
);

export default Navbar;
