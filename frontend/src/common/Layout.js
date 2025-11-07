// Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { linklists, headersClasses } from './RouterList';

const Layout = ({ children }) => {
    return (
        <div>
            <Header linklists={linklists} headersClasses={headersClasses} />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
