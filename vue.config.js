/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  configureWebpack: {
    mode: 'production',
    output: {
      chunkFilename: 'js/[name].[chunkhash].js',
      path: path.resolve(__dirname, './dist'),
    },
    plugins: [
      new TerserPlugin(),
    ],
    optimization: {
      runtimeChunk: 'single',
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: true,
          parallel: true,
          terserOptions: {
            ecma: 6,
            parse: {},
            extractComments: 'all',
            compress: {
              sequences: true,
              dead_code: true,
              conditionals: true,
              booleans: true,
              unused: true,
              if_return: true,
              join_vars: true,
              drop_console: true,
            },
            mangle: true, // Note `mangle.properties` is `false` by default.
            output: {
              comments: false,
              beautify: false,
            },
            format: null,
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_classnames: undefined,
            keep_fnames: false,
            safari10: false,
          },
        })],
    },
  },
  devServer: {
    proxy: {
      'https://free.currconv.com/^': {
        target: 'https://free.currconv.com/api/v7',
        changeOrigin: true,
      },
    },
  },
};
