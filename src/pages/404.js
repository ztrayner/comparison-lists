import React from 'react';
import Link from 'gatsby-link';

const NotFoundPage = () => (
    <div className="container">
        <h1>NOT FOUND</h1>
        <p>It looks like the page you are looking for is no longer available.</p>
        <Link to="/">Head home</Link>
    </div>
);

export default NotFoundPage;
