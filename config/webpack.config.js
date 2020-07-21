const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const postcssConfig = require( './postcss.config' );

const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const RtlCssPlugin = require( 'rtlcss-webpack-plugin' );
const FixStyleOnlyEntriesPlugin = require( "webpack-fix-style-only-entries" );
const nodeSassGlobImporter = require( 'node-sass-glob-importer' );

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	...defaultConfig,

	entry: {
		'index': path.resolve( process.cwd(), 'blocks/blocks.js' ),
		'editor': path.resolve( process.cwd(), 'blocks/editor.scss' ),
		'style': path.resolve( process.cwd(), 'blocks/style.scss' ),
	},

	output: {
		filename: '[name].js',
		path: path.resolve( process.cwd(), '' ),
	},

	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,

			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							url: false,
							sourceMap: ! isProduction,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							...postcssConfig,
							sourceMap: ! isProduction,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: ! isProduction,
							sassOptions: {
								importer: nodeSassGlobImporter(),
							}
						}
					}
				],
			},
		],
	},

	stats: {
		...defaultConfig.stats,
		modules: false,
		warnings: false,
	},

	plugins: [
		...defaultConfig.plugins,

		new FixStyleOnlyEntriesPlugin(),
		new MiniCssExtractPlugin( {
			filename: '[name].css',
		} ),
		new RtlCssPlugin( {
			filename: '[name]-rtl.css'
		} ),
	],
};
