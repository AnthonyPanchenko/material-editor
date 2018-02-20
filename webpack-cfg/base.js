const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (settings) => {
  const stylesLoaders = [
    {
      loader: 'css-loader',
      options: { minimize: settings.env === 'production' }
    },
    'postcss-loader',
    'sass-loader',
    {
      loader: 'sass-resources-loader',
      options: {
        resources: [
          `${settings.src}/common/styles/variables.scss`,
          `${settings.src}/common/styles/reset.scss`,
          `${settings.src}/common/styles/fonts.scss`,
          `${settings.src}/common/styles/font-icons.scss`,
          `${settings.src}/common/styles/common.scss`,
          `${settings.src}/common/styles/animations.scss`,
          `${settings.src}/common/styles/base-layout.scss`,
          `${settings.src}/common/styles/fieldset.scss`
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
          test: /\.js$/,
          include: settings.src,
          use: (settings.env === 'development') ? ['babel-loader', 'eslint-loader'] : ['babel-loader']
        },
        {
          test: /\.html$/,
          use: ['vue-html-loader']
        },
        {
          test: /\.vue$/,
          use: ['vue-loader']
        },
        {
          test: /\.(css|scss)$/,
          loader: settings.env === 'production'
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
    }
  };
};
