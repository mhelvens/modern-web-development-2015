var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: {
		'index-1': ['babel/polyfill', './src/index-1.es6.js'],
		'index-2': ['babel/polyfill', './src/index-2.es6.js'],
		'index':   ['babel/polyfill', './src/index.es6.js'  ]
	},
	output: {
		path:              './dist',
		filename:          '[name].js',
		sourceMapFilename: '[file].map'
	},
	module: {
		loaders: [
			{ test: /\.es6\.js$/, exclude: /node_modules|bower_components/, loader: 'babel' },
			{ test: /\.scss$/,    exclude: /node_modules|bower_components/, loader: "style!css!autoprefixer!sass" }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Modern Web Development 2014 (1)",
			jsFile: "./index-1.js",
			template: "./src/index-1.html",
			filename: "index-1.html"
		}),
		new HtmlWebpackPlugin({
			title: "Modern Web Development 2014 (2)",
			jsFile: "./index-2.js",
			template: "./src/index-2.html",
			filename: "index-2.html"
		}),
		new HtmlWebpackPlugin({
			title: "Modern Web Development 2014 (final)",
			jsFile: "./index.js",
			template: "./src/index.html",
			filename: "index.html"
		})
	]
};
