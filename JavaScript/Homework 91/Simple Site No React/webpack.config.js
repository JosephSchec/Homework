const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: "production",
    devtool: "source-map",
    entry: {
        app: ['babel-polyfill','./src/index.js'],
        displayUsers:'./src/DisplayUsers.js',
        displayAllPosts:'./src/DisplayAllPosts.js',
        displayUserBlogs:'./src/DisplayBlogs.js',
        displayArticle:'./src/DisplayArticle.js',
        displayComments:'./src/ShowComments.js'

    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    }, optimization: {
        splitChunks: {
            chunks: 'all',
        },
        minimizer: [new TerserPlugin({ extractComments: false })],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CompressionPlugin(),
        new ESLintPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }, {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};