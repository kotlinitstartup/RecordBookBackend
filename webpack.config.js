const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
  target: 'node',
  performance: {
    hints: false,
  },
  entry: './index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(j|t)s$/,
        exclude: [/(node_modules|bower_components)/],
        use: {
          loader: 'babel-loader',
          options: {
            sourceType: 'unambiguous',
            presets: ['@babel/preset-env'],
            exclude: [/node_modules[\\/]core-js/],
            plugins: [
              '@babel/plugin-transform-runtime',
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              ['@babel/plugin-proposal-private-methods', { loose: true }],
            ],
          },
        },
      },
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: { configFile: 'tsconfig.json' },
        },
      },
    ],
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        extensions: ['.js', '.ts', '.json'],
        /* options: see below */
      }),
    ],
    extensions: ['.ts', '.js', '.json'],
  },
  plugins: [
    new webpack.BannerPlugin({
      raw: true,
      entryOnly: false,
      banner: `require('${
        // Is source-map-support installed as project dependency, or linked?
        require.resolve('source-map-support').indexOf(process.cwd()) === 0
          ? // If it's resolvable from the project root, it's a project dependency.
            'source-map-support/register'
          : // It's not under the project, it's linked via lerna.
            require.resolve('source-map-support/register')
      }');`,
    }),
    new NodemonPlugin({
      // Node arguments.
      nodeArgs: ['-r', 'dotenv/config'],
      signal: 'SIGINT',
      ext: 'ts,js,json',
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
};
