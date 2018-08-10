const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const mode = process.env.NODE_ENV

const isProduction = mode === 'production' ? true : false
const config = {
  entry: {
    index: path.resolve(__dirname, './src/js/index.js'),
    main: path.resolve(__dirname, './src/js/main.js'),
    // vendors: ['jquery', 'moment']  // 提取公共类库
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'js/[name].js',
    // publicPath: '/'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        include: /src/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        // loader: ['style-loader','css-loader']
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png)|(jpg)$/,
        loader: "url?limit=50000"
      },
    ]
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin('vendors','vendors.js'),
    new HtmlWebpackPlugin({
      filename: __dirname + '/dist/html/index.html',
      template: __dirname + "/src/html/index.html",
      chunks: ['index'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: __dirname + '/dist/html/main.html',
      template: __dirname + "/src/html/main.html",
      chunks: ['main'],
      inject: true
    }),
    new ExtractTextPlugin('css/[name].css'),
    new CleanWebpackPlugin(
      ['dist/*', 'dist/*', ], 　 {
        root: __dirname,
        verbose: true,
        dry: false　　　　　　　　　　
      }
    ),
    new UglifyJsPlugin({
      test: /.js($|\?)/i,
      // include: /dist/,
      sourceMap: true,
      uglifyOptions: {
        ecma: 6,
        mangle: true,
        output: {
          comments: false,
          beautify: false
        },
        compress: {
          drop_console: true
        },
        warnings: false
      }
    })
  ]
}
if (mode === 'production') {
  config.devServer = {
    contentBase: path.join(__dirname, './dist'),
    open: true,
    port: 3333
  }
}


module.exports = config