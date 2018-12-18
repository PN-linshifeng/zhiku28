const merge = require('webpack-merge');
const path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成HTML文件
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
// var SpritesmithPlugin = require('webpack-spritesmith'); //生成雪碧图
// var CleanWebpackPlugin = require('clean-webpack-plugin'); //清理文件夹
const baseConfig = require('./webpack.base.js');
const devMode = process.env.NODE_ENV !== 'production';
console.log('devMode', process.env.NODE_ENV)

let config = merge(baseConfig, {
  mode: 'production', //development production
  // devtool: 'source-map', //'inline-source-map', //这有助于解释说明我们的目的（仅解释说明，不要用于生产环境）
  // entry: {
  //   vendor: [
  //     // "babel-polyfill",
  //     'react',
  //     'react-dom',
  //     'react-router-dom',
  //     'axios',
  //     'mobx',
  //     'mobx-react',
  //     'moment',
  //     'perfect-scrollbar',
  //   ],
  //   app: './src/index.js',
  // },
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: 'js/[name].bundle.js',
  },

  plugins: [
    //清理文件夹
    // new CleanWebpackPlugin(['dist']),
    //生成HTML
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/index.html"),
    }),
    new HtmlWebpackPlugin({
      template: "!!ejs-compiled-loader!" + path.join(__dirname, "../src/server.ejs"),
      filename: 'server.ejs',
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeAttributeQuotes: true,
        trimCustomFragments: true
      }
    }),
    // new webpack.HotModuleReplacementPlugin(), // 启用 HMR

    //提取css样式插件
    new MiniCssExtractPlugin({
      filename: devMode ? "css/[name].css" : 'css/[name].[hash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
    }),
  ],
  //压缩js


});

if (devMode) {
  config.mode = 'development';
  config.devtool = 'inline-source-map';
  config.entry = {
    app: [
      "babel-polyfill",
      'react-hot-loader/patch', './src/index.js'
    ]
  };
  config.devServer = {
    contentBase: path.join(__dirname, "../dist"), //告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。devServer.publicPath 将用于确定应该从哪里提供 bundle，并且此选项优先 。跟入口的path相同
    publicPath: '/public/', //打包文件目录，跟output.publicPath相同
    compress: true, //是否gzip压缩
    port: 8100,
    host: '0.0.0.0',
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/public/index.html' },
        { from: /^\/subpage/, to: '/views/subpage.html' },
        { from: /./, to: '/public/index.html' }
      ]
      // index: '/public/index.html'
    },
    hot: true, // 使用热加载插件 HotModuleReplacementPlugin
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'https://content.aetoscg.info', // 财经日历 汇评 新闻
        secure: false,
        changeOrigin: true
      },
      '/quote': {
        target: 'https://quote.aetoscg.info/quote', // chart
        secure: false,
        changeOrigin: true
      },
      '/content': {
        target: 'http://r.theaetos.com/trust', // 集团新闻
        secure: false,
        changeOrigin: true
      }

    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
  config.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: false,
          maxLineLength: 500
        }
      })
    ],
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        react: {
          test: /react/,
          name: 'react',
          chunks: "all",
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}



config.plugins.push(new CopyWebpackPlugin([{ from: path.join(__dirname, "../public"), to: path.join(__dirname, "../dist") }]))

module.exports = config;
