var webpack = require('webpack');
var nib = require('nib');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
var extractCSS = new ExtractTextPlugin('common.css');

module.exports = {
	context: path.join(__dirname, "src"),
	devtool: "inline-sourcemap",
	entry: './index.js',
	stats: {
		children: false
	},
	output: {
		path: __dirname,
		filename: 'main.min.js'
	},
	resolve: {
		extensions: ['', '.js', '.styl']
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
				}
			},
			{
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract('style-loader',
					'css-loader?modules&importLoaders=1&localIdentName=[local]--[hash:base64:5]!stylus-loader')
			},
			{
				test: /\.ttf$/,
				loader: "url-loader", // or directly file-loader
				include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
			}
		]
	},
	stylus: {
		use: [nib()],
		import: ['~nib/lib/nib/index.styl']
	},
	plugins: [
		extractCSS,
		//new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: true, compress: {warnings: false}})
	]
};