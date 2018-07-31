const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new UglifyJsPlugin({
            test: /bundle/i,
            sourceMap    : true,
            uglifyOptions: {
                ecma: 6,
                mangle: true,
                compress: true,
                warnings: false
            }
       })
    ],
    devServer: {
        contentBase: path.join(__dirname,'./release'),
        open: true,
        port: 3333
    }
}