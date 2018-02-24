import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Navbar from '../components/Navbar';
require('typeface-aleo');
import './all.scss';

const TemplateWrapper = ({ children }) => (
    <div>
        <Helmet title="Binkies & Babies" />
        <Navbar />
        <main>{children()}</main>
    </div>
);

TemplateWrapper.propTypes = {
    children: PropTypes.func
};

export default TemplateWrapper;
