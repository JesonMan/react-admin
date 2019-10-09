const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack'); // 使用 happypack 启用多进程并发进行 loader 转换，优化构建速度
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	// 应用入口
	entry: {
		app: path.join(__dirname, 'src/index.js'), // index.js作为打包的入口
	},
	// 输出目录
	output: {
		filename: 'js/[name]-[hash:8].js', // name代表entry对应的名字; hash代表 整个app打包完成后根据内容加上hash。一旦整个文件内容变更，hash就会变化
		path: path.join(__dirname, 'dist'), // 打包好之后的输出路径
		chunkFilename: 'js/[name]-[chunkhash:8].js',
		publicPath: '/'
	},
	resolve: {
		alias: {
			'@': path.join(__dirname, 'src')
		},
		modules: [path.resolve(__dirname, 'node_modules')], // 优化，指定第三方模块的加载绝对路径
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			loader: 'eslint-loader',
			enforce: 'pre',
			include: [path.resolve(__dirname, 'src')], // 指定检查的目录
		}, {
			test: /\.jsx?$/,
			use: 'happypack/loader?id=jsx',
			exclude: /node_modules/, // 排除指定路径，优化构建性能
		}, {
			test: /\.scss$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
					options: {
						hmr: isDev,
					},
				},
				{
					loader: 'css-loader',
					options: {
						modules: {
							localIdentName: isDev ? '[local]--[hash:base64:5]' : '[hash:base64]',
						}
					}
				},
				{
					loader: 'postcss-loader',
					options: {
					  plugins: [require('autoprefixer')]
					}
				},
				'sass-loader',
			],
			exclude: [/node_modules/, path.resolve(__dirname, 'src/common')]
		}, {
			test: /\.css$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
					options: {
						hmr: isDev,
					},
				},
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
					  plugins: [require('autoprefixer')]
					}
				}
			],
			include: [/node_modules/, path.resolve(__dirname, 'src/common')]
		}, {
			test: /\.scss$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
					options: {
						hmr: isDev,
					},
				},
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
					  plugins: [require('autoprefixer')]
					}
				},
				'sass-loader'
			],
			include: [path.resolve(__dirname, 'src/common')]
		}, {
			test: /\.(png|jpg|gif|woff|svg|eot|ttf)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192,
					name: 'img/[name]-[contenthash:6].[ext]'
				}
			}],
		}],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HappyPack({
			id: 'jsx',
			loaders: ['babel-loader?cacheDirectory'],
		}),
		new DllReferencePlugin({
			manifest: require('./dll/vendor.manifest.json'),
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html',
			favicon: './src/favicon.ico'
		}),
		new AddAssetHtmlWebpackPlugin({
			filepath: './dll/vendor.dll.js',
		}),
	],
};
