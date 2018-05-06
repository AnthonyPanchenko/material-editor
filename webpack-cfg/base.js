const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = (settings) => {
  const stylesLoaders = [
    {
      loader: 'css-loader',
      options: { minimize: isProd }
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
          test: require.resolve('three/examples/js/controls/OrbitControls'),
          use: [
            'imports-loader?THREE=three',
            'exports-loader?THREE.OrbitControls'
          ]
        },
        {
          test: require.resolve('three/examples/js/controls/TransformControls'),
          use: [
            'imports-loader?THREE=three',
            'exports-loader?THREE.TransformControls'
          ]
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          exclude: /node_modules/
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.js$/,
          loader: isProd ? [{ loader: 'babel-loader' }] : [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }],
          exclude: /node_modules/
        },
        {
          test: /\.(css|scss)$/,
          loader: isProd
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
      new VueLoaderPlugin(),
      new webpack.LoaderOptionsPlugin({ minimize: isProd, debug: !isProd }),
      new HtmlWebpackPlugin({ template: `${settings.src}/template.html` }),
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) })
    ]
  };
};
