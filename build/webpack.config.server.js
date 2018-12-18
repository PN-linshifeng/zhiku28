const merge = require('webpack-merge');
const path = require("path");
const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');
baseConfig.module.rules[1].use = [{
  loader: "css-loader/locals" // 使用locals会直接使用browser编译好的css
}]

module.exports = merge(baseConfig, {
  target: 'node',
  mode: 'production', //development production
  // devtool: 'source-map', //'inline-source-map', //这有助于解释说明我们的目的（仅解释说明，不要用于生产环境）
  entry: {
    app: './src/server.js'
  },
  externals: ['react-helmet'],
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: "/public/",
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.CONTENT': '"https://content.aetoscg.info"',
      'process.env.QUOTE': '"https://quote.aetoscg.info/quote"',
      'process.env.TRUST': '"http://r.theaetos.com/trust"',
      'process.env.BASE': '"http://localhost:3333"',
      'process.env.TARGET': '"node"'
    })
  ]
});
