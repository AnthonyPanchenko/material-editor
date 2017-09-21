const config = require('../app.config');
const { resolve } = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [resolve(__dirname, config.src), 'node_modules'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
    },
  },

  output: {
    path: resolve(__dirname, config.build),
    publicPath: config.urlBasePath,
    filename: 'app.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: resolve(__dirname, config.src),
        use: (process.env.NODE_ENV === 'development') ? ['babel-loader', 'eslint-loader'] : ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.html$/,
        use: ['vue-html-loader'],
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(ico|png|jpg|gif|eot|ttf|svg|woff|woff2)(\?.+)?$/,
        use: ['file-loader?hash=sha512&digest=hex&name=[hash].[ext]'],
      },
      {
        test: /\.(json)(\?.+)?$/,
        use: ['url-loader?name=[path][name].[ext]?[hash]'],
      },
    ],
  },
};
