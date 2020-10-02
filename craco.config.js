const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  webpack: {
    alias: {},
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['javascript', 'json', 'typescript', 'css', 'html']
      })
    ],
    configure: (webpackConfig => {
      webpackConfig.resolve.extensions = ['.wasm', ...webpackConfig.resolve.extensions];

      webpackConfig.module.rules = [
        {
          test: /\.wasm$/,
          loader: "file-loader",
          type: "javascript/auto"
        },
        ...webpackConfig.module.rules
      ];

      return webpackConfig;
    })
  },
};
