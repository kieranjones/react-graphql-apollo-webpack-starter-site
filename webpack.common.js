const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	name: "browser",
	entry: [
        'babel-polyfill',
       	'./src/client/index',
		'./src/styles/main.scss'
    ],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    node: {
        fs: 'empty'
    },
	module: {
		rules: [
            {
                test: /\.json$/,
                use: {
                	loader: 'json-loader'
                }
            },
			{
				test: /\.jsx?$/,
				exclude: [path.resolve(__dirname, 'node_modules')],
				use: {
					loader: 'babel-loader',
					options: {
                        cacheDirectory: true,
						presets: ["es2015", "react", "stage-0"],
                        plugins: [
                           // 'react-hot-loader/babel'
                        ]
					}
				}
			},
            {
                test: /\.scss$/,
                // loader: ExtractTextPlugin.extract({
					// fallback: 'style-loader',
                //     use: ['css-loader', 'sass-loader', 'postcss-loader', 'resolve-url-loader']
                // })
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{ loader: 'css-loader', options: { sourceMap: true, minimize: (process.env.NODE_ENV === 'production') } },
						{ loader: 'postcss-loader',
							options: {
								sourceMap: true,
								plugins: () => [autoprefixer({
									browsers: ['last 2 versions', 'ie >= 10', 'ios >= 9', 'Android >= 4']
								})]
							}
						},
						'resolve-url-loader',
						{ loader: 'sass-loader',
							options: {
								sourceMap: true,
								outputStyle: 'compressed'
							}
						}
					],
				  // publicPath: "../"
				})
			},
			// { test: /\.scss$/, use: ExtractTextPlugin.extract({
			// 	fallback: "style-loader",
			// 	use: {
			// 		loader: "css-loader",
			// 		options: {
			// 			sourceMap: true
			// 		}
			// 	},
			// 	//publicPath: "../"
			// }) },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }
		]
	},
    plugins: [
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin({
            filename: 'dist/styles.css',
            allChunks: true,
            disable: process.env.NODE_ENV !== 'production'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};
