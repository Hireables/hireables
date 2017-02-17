/* eslint no-var: 0 */
/* eslint new-cap: 0 */
// Base client-side webpack configuration

var webpack = require('webpack');
var _ = require('underscore');
var path = require('path');

var devBuild = process.env.NODE_ENV !== 'production';
var nodeEnv = devBuild ? 'development' : 'production';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var defaults = {
  // the project dir
  context: __dirname,
  // Sourcemap generation
  devtool: 'eval',
  entry: {
    // See use of 'vendor' in the CommonsChunkPlugin inclusion below.
    vendor: [
      'babel-polyfill',
      'jquery',
      'jquery-ujs',
      'react-dom',
      'react',
    ],
    // Main component entry file: components.jsx
    app: [
      './app/assets/javascripts/components',
    ],
  },
  output: {
    filename: '[name]-bundle.js',
    pathinfo: true,
    path: './app/assets/webpack',
  },
  // Extensions to resolve
  resolve: {
    modules: [
      path.resolve('./app/assets/javascripts'),
      path.resolve('./node_modules'),
    ],
    extensions: ['.js', '.jsx', '.es6.js'],
  },

  resolveLoader: {
    modules: [path.resolve('./node_modules')],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),

    new ExtractTextPlugin({ filename: 'vendor-bundle.css', allChunks: true }),

    // https://webpack.github.io/docs/list-of-plugins.html#2-explicit-vendor-chunk
    new webpack.optimize.CommonsChunkPlugin({

      // This name 'vendor' ties into the entry definition
      name: 'vendor',
      filename: 'vendor-bundle.js',

      // Passing Infinity just creates the commons chunk, but moves no modules into it.
      // In other words, we only put what's in the vendor entry definition in vendor-bundle.js
      minChunks: Infinity,
    }),
  ],
  module: {
    rules: [
      // For react-rails we need to expose these deps to global object
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
      },
      {
        test: /\.sass$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: [path.resolve(__dirname, './app/assets/javascripts/')],
          },
        }],
      },
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            query: 'jQuery',
          },
          {
            loader: 'expose-loader',
            query: '$',
          },
        ],
      },

      {
        test: require.resolve('react'),
        use: [
          {
            loader: 'expose-loader',
            query: 'React',
          },
        ],
      },

      {
        test: require.resolve('react-dom'),
        use: [
          {
            loader: 'expose-loader',
            query: 'ReactDOM',
          },
        ],
      },

      { test: /\.json$/, loader: 'json-loader' },
    ],
  },
};

var config = _.clone(defaults);

if (!devBuild) {
  config.devtool = 'inline-source-map';
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      sourceMap: false,
      compress: {
        warnings: false,
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true,
      },
    })
  );
}

module.exports = config;
