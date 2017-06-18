const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: {
        app: [
        './src/index.jsx',
        './src/main.scss'
        ]
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                use: 'babel-loader', 
                exclude: /node_modules/ 
            },
            { 
                test: /\.jsx$/, 
                use: 'babel-loader', 
                exclude: /node_modules/ 
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader', 'import-glob-loader'],
                    fallback: 'style-loader',
                }),
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        }), 
        new ExtractTextPlugin({
            filename: '[name].css',
        })
    ],
    devServer: {
        quiet: false,
        stats: { colors: true },
        //proxy: { "/api/**":"http://localhost:3030/" }
        proxy: {
            "/api/**": {
                "target": {
                    "host": "localhost",
                    "protocol": 'http:',
                    "port": 3030
                },
                ignorePath: false,
                changeOrigin: true,
                secure: false
            }
        }
    }
}