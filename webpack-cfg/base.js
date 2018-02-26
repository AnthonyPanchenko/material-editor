const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (settings) => {
  const stylesLoaders = [
    {
      loader: 'css-loader',
      options: { minimize: settings.isProd }
    },
    'postcss-loader',
    'sass-loader',
    {
      loader: 'sass-resources-loader',
      options: {
        resources: [
          `${settings.src}/common/styles/variables.scss`
        ]
      }
    }
  ];

  return {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      modules: [settings.src, 'node_modules']
    },

    output: {
      path: settings.dist,
      publicPath: settings.publicPath,
      filename: 'bundle.js'
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              js: settings.isProd ? [{ loader: 'babel-loader' }] : [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }]
            }
          }
        },
        {
          test: /\.(css|scss)$/,
          loader: settings.isProd
            ? ExtractTextPlugin.extract({ fallback: 'style-loader', use: stylesLoaders })
            : ['style-loader', ...stylesLoaders]
        },
        {
          test: /\.(png|jpeg|jpg|gif|woff|woff2|eot|ttf|svg|ico|otf)(\?.*$|$)/,
          use: ['file-loader']
        },
        {
          test: /\.(json)(\?.+)?$/,
          use: ['url-loader']
        }
      ]
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: settings.isProd,
        debug: !settings.isProd
      }),
      new HtmlWebpackPlugin({ template: `${settings.src}/template.html` }),
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(settings.env) }),
    ]
  };
};
