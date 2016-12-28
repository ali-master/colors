const path 	  = require("path");
const webpack = require("webpack");

module.exports = {
	devtool: "source-map",
	debug: true,
	entry: ["./static/app.js"],
	output: {
		pathInfo: true,
		path: __dirname + "/public/",
		publicPath: "/public/",

		filename: "scripts/app.min.js",
		sourceMapFilename: "[file].map",
		chunkFilename: "scripts/[id].js"
	},
	stats: {
		colors: true,
		reasons: true
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				execlude: /node_modules|bower_components/,
				// query: {
				// 	"presets": ["es2015"]
				// }
			}
		]
	},
	resolve: {
		extension: ["" ,".webpack.js", ".js", ".jsx"],
		modulesDirectories: ['node_modules', 'bower_components', 'shared'],
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
	    new webpack.optimize.DedupePlugin(),
	    new webpack.optimize.OccurenceOrderPlugin(),
	    new webpack.optimize.UglifyJsPlugin({
	    	compress: { warnings: false },
	    	mangle: true,
	    	sourcemap: false,
	    	beautify: false,
	    	dead_code: true
	    })
	]
}