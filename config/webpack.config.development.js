const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'scripts/[name].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: 'scripts/[name].js',
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sass$|css$)$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/, /\.ico$/],
                loader: 'url-loader',
                options: {
                  limit: 2048,
                  name: 'images/[name].[ext]',
                },
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        })
    ]
}