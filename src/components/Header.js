import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

const Header = ({ location }) => {
	return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <nav className="navbar navbar-inverse navbar-fixed-top">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                </button>
                                <Link to="/" className="navbar-brand">React, GraphQL, Apollo, Webpack Starter Site</Link>
                            </div>
                            <div id="navbar" className="collapse navbar-collapse">
                                <ul className="nav navbar-nav">
                                    <li><NavLink to="/" className={location.pathname === '/' ? 'active' : ''} activeClassName="active-link">Home</NavLink></li>
                                    <li><NavLink to="/faqs" className={location.pathname.includes('/faq') ? 'active' : ''} activeClassName="active-link">FAQs</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
	);
};

Header.propTypes = {
	location: PropTypes.object.isRequired
};

export default Header;

