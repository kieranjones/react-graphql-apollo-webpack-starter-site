require('babel-register');
require('babel-polyfill');
import path from 'path';
import webpack from 'webpack';
import express from 'express';
import React from 'React';
import fs from 'fs';
import config from '../../webpack.dev.js';
import AppComponent from '../components/App';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getDataFromTree } from 'react-apollo';
import schema from '../schema/schema';
import expressGraphQL from 'express-graphql';

const app = express();
const compiler = webpack(config);

const env = process.env.APP_ENV || process.env.NODE_ENV || 'development';

if (env !== 'production') {
	app.use(require('webpack-dev-middleware')(compiler, {
		publicPath: config.output.publicPath,
		noInfo: true,
		stats: {
			colors: true
		},
		serverSideRender: true
	}));

	app.use(require('webpack-hot-middleware')(compiler));
}

// Serve static files
app.use('/dist', express.static(path.join(__dirname, '../../dist')));

// TODO - Separate these out into controllers
app.use('/api/faqData/homepage', (req, res) => {
	fs.readFile(path.join(path.resolve(__dirname) + '/../stubs/faqData.json'), 'utf8', function(err, data) {
		if (err) { return res.status(404).send(err); }
		const obj = JSON.parse(data);
		res.send(obj.homepage);
	});
});

app.use('/api/faqData/faq', (req, res) => {
	fs.readFile(path.join(path.resolve(__dirname) + '/../stubs/faqData.json'), 'utf8', function(err, data) {
		if (err) { return res.status(404).send(err); }
		const obj = JSON.parse(data);
		res.send(obj.faqs);
	});
});

app.use('/api/faqData', (req, res) => {
	fs.readFile(path.join(path.resolve(__dirname) + '/../stubs/faqData.json'), 'utf8', function(err, data) {
		if (err) { return res.status(404).send(err); }
		const obj = JSON.parse(data);
		res.send(obj);
	});
});

app.use('/graphql', expressGraphQL({
	schema,
	graphiql: true
}));

function renderFullPage(html, initialState) {
	return `
    <!doctype html>
    <html>
      <head>
      	<!-- The first thing in any HTML file should be the charset -->
		<meta charset="utf-8">
		<!-- Make the page mobile compatible -->
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- Allow installing the app to the homescreen -->
		<link rel="manifest" href="manifest.json">
		<meta name="mobile-web-app-capable" content="yes">
        <title>React, GraphQL, Apollo, Webpack Starter Site</title>
        <link href="/dist/styles.css" rel="stylesheet" type="text/css" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__APOLLO_STATE__= ${JSON.stringify(initialState).replace(/</g, '\\u003c')}
        </script>
        <script src="/dist/bundle.js"></script>
      </body>
    </html>
    `;
}

app.use((req, res) => {
	const client = new ApolloClient({
		ssrMode: true,
		link: createHttpLink({
			uri: 'http://localhost:3000/graphql',
			credentials: 'same-origin',
			headers: {
				cookie: req.header('Cookie')
			},
			fetch: fetch
		}),
		cache: new InMemoryCache()
	});

	const serverApp = (
        <ApolloProvider client={client}>
            <StaticRouter context={{}} location={req.url}>
                <AppComponent />
            </StaticRouter>
        </ApolloProvider>
    );

	getDataFromTree(serverApp).then(() => {
        // We are ready to render for real
		const content = renderToString(serverApp);
		const initialState = client.cache.extract();

        // Send the rendered page back to the client
		res.send(renderFullPage(content, initialState));
	});
});

const server = app.listen(process.env.PORT || 3000, function(err) {
	if (err) {
		return console.error(err);
	}
	const port = server.address().port;

	console.log(`Listening at ${port}`);
});

export default app;
