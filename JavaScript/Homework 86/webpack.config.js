const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");
const handler = (percentage, message, ...args) => {
    console.info(percentage, message, ...args);
};
module.exports = {
    mode: "production",
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    plugins: [new HtmlWebpackPlugin({
        template: "src/index.html"
    }),
    new webpack.BannerPlugin('My banner here'),
    new CompressionPlugin({
        test: /\.js(\?.*)?$/i,
    }),
    new webpack.ProgressPlugin(handler)],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};