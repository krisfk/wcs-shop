const HtmlWebPackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//const { VueLoaderPlugin } = require('vue-loader');


module.exports = {

	mode: "production",
	watch: true,
	entry: {
		init: './src/init.js',
		index: './src/index.js',
		cart: './src/cart.js',
		complete: './src/complete.js',
	},
	performance: {
		hints: false
	},

	output: {
		//		filename: "[name].bundle.js",
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}, {
				test: /\.html$/,
				use: [{
					loader: "html-loader",
					options: {
						minimize: false
					}
				}]
			},
			/*{
				test: /\.(ttf|eot|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]',
					publicPath: '/'
				}, 
			},*/
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'file-loader',
				options: {
					name: 'img/[name].[ext]',
					publicPath: './',
					limit: 40000
				},
			}, {
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			}

			/* {  
				test: /\.s?css/,
				use: ["style-loader", "css-loader", "sass-loader"]
			}*/
			/*, {
							test: /\.(png|jp(e*)g|svg)$/,
							loader: 'url-loader',
							use: [{
								loader: 'url-loader',
								options: {
									limit: 8000, // Convert images < 8kb to base64 strings
									name: 'images/[hash]-[name].[ext]'
								}
							}]
						}*/

		]
	},


	plugins: [

		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			files: ['./dist/#.php'],
			proxy: 'http://localhost/wcs-shop/dist/'
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
				/*,
							"window.jQuery": "jquery"*/
		}),
		new ExtractTextPlugin({
			filename: 'style.css'
		})

	]

};
