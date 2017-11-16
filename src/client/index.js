require('babel-polyfill');
import { render as reactDomRender } from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
	link: new createHttpLink({ uri: 'http://localhost:3000/graphql' }),
	cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
});

// Hacky way of getting Bootstrap working for now
window.$ = window.jQuery = require('jquery');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap');

const render = Component => {
	reactDomRender((
        <ApolloProvider client={client}>
            <BrowserRouter context={{}} location={document.location.path}>
                <Component />
            </BrowserRouter>
        </ApolloProvider>

    ), document.getElementById('root'));
};

render(App);

if (module.hot) {
	module.hot.accept('../components/App', () => {
		const nextApp = require('../components/App').default;
		render(nextApp);
	});
}
