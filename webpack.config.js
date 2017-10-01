
const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

/***************************************************************************** */

// const BUILD_DIR = path.join(__dirname, 'build');
// const CLIENT_DIR = path.join(__dirname, 'client');
const DIST_DIR = path.join(__dirname, 'dist');
// const SERVER_DIR = path.join(__dirname, 'server');
// const PUBLIC_DIR = path.join(__dirname, 'public');

// const extractCSS = new ExtractTextPlugin('styles.css');


/*******************************************************************************
 * CLIENT
 ***************************************************************************** */

const CLIENT_CONFIG = {
  name: 'client',
  target: 'web',
  entry: {
    client: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './client',
    ],
  },
  output: {
    path: DIST_DIR,
    filename: 'client.js',
    publicPath: '/',
  },

  plugins: [
    // new BundleAnalyzerPlugin(),  // OPTIONAL Bundle analyzer

    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),

    new ExtractTextPlugin('styles.css'),

    // new webpack.LoaderOptionsPlugin({ debug: true }),

    new webpack.NamedModulesPlugin(),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

  ],

  // devtool: 'eval', // Babel transpiled code, as [eval]uated by the browser.
  devtool: 'source-map', // Un-transpiled sourcecode.

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loaders: [
        'react-hot-loader/webpack',
        'babel-loader',
        'stylelint-custom-processor-loader',
        // 'eslint-loader',
      ],
      exclude: /node_modules/,

    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      }),

    }, {
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
      // loaders: [
      //   'babel-loader',
      //   'graphql-tag/loader',
      // ],


      // }, {
      //   test: /\.(png)$/,
      //   use: {
      //     loader: 'url-loader',
      //     options: {
      //       limit: 100000,
      //       outputPath: '../images/',
      //       publicPath: '/dist/images/'
      //     }
      //   },

      // }, {
      //   test: /\.jpg$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       outputPath: '../images/',
      //       publicPath: '/dist/images/'
      //     }
      //   }

    }],
  }, // END: module

  node: {
    fs: 'empty',
    // process: false,
  },

  // eslint: {
  //   configFile: './.eslintrc.js'
  // },

  bail: false,
};

/*******************************************************************************
 * SERVER
 ***************************************************************************** */

const SERVER_CONFIG = {
  name: 'server',
  target: 'node',
  entry: {
    server: './server',
  },
  output: {
    path: DIST_DIR,
    filename: '[name].bundle].js',
    publicPath: '/',
  },

  devtool: 'source-map',

  externals: fs.readdirSync('node_modules')
    .filter(x => !x.includes('.bin'))
    .reduce((obj, mod) => {
      obj[mod] = `commonjs ${mod}`; // eslint-disable-line
      return obj;
    }, {}),

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    }],
  },

  node: {
    process: false,
  },

  bail: false,
};

/** ****************************************************************************/

module.exports = [
  SERVER_CONFIG,
  CLIENT_CONFIG,
];
