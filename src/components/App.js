import React from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import Header from './Header';
import routes from '../routes/routes';

export const App = ({ location }) => {
	return (
        <div className="app">
            <div className="app__header">
                <Header location={location} />
            </div>
            <div className="main__container">
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                ))}
            </div>
        </div>
	);
};

App.propTypes = {
	location: PropTypes.object.isRequired
};

const withRouterApp = withRouter(App);
export default withRouterApp;
