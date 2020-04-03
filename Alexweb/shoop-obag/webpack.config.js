/* -== Const ==- */
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const postcssAnimation = require('postcss-animation');
const postcssColorMod = require('postcss-color-mod-function');
const colorFunction = require("postcss-color-function");
const postcssImport = require('postcss-import');
const postcssFontMagician = require('postcss-font-magician');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

/* -== Settings ==- */ 
module.exports = {
    entry: {
        common: './src/index.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: 'js/[name].js'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                extractComments: true
            })
        ]
    },
    module: {
        rules: [{
            test: [/.js$/],
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ]
                }
            }
        }, {
            test: /\.css$|.pcss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            postcssFontMagician({
                                variants: {
                                    'Montserrat': {
                                        '100': [],
                                        '300': [],
                                        '400': [],
                                        '700': [],
                                        '900': []
                                    }
                                },
                                foundries: ['google']
                            }),
                            postcssImport(),
                            postcssColorMod({}),
                            colorFunction({}),
                            postcssAnimation({}),
                            autoprefixer({
                                overrideBrowserslist: [
                                    'ie >= 8',
                                    'last 4 version'
                                ]
                            }),
                        ],
                        sourceMap: true
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                },
            ]
        }, {
            test: [/.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/],
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: '../src/fonts/',
                    publicPath: '../style/fonts/',
                }
            }]
        }, {
            test: [/.(png|jpg|gif)$/],
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './../img'
                    }
                }
            ]
         }]
    },
    plugins: [
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            host: 'localhost',
            port: 3500,
            files: ['./dist/*.html', './dist/style/*.css'],
            server: { baseDir: ['dist'] }
          }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'category.html',
            template: './src/category.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'gift-card.html',
            template: './src/gift-card.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'e-gift-card-listing.html',
            template: './src/e-gift-card-listing.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'e-gift-card-product-page.html',
            template: './src/e-gift-card-product-page.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'single-product-page.html',
            template: './src/single-product-page.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'whatsapp-page.html',
            template: './src/whatsapp-page.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'single-product-page--[product bundle].html',
            template: './src/single-product-page--[product bundle].html'
        }),
        new HtmlWebpackPlugin({
            filename: 'single-product-page--[product bundle 02].html',
            template: './src/single-product-page--[product bundle 02].html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style/app.css',
            publicPath: 'style/app.css',
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            canPrint: true
        }),
        
    ],
    watch: true
};