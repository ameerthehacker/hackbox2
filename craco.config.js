const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  webpack: {
    alias: {
      '@vscode': path.resolve(__dirname, 'vscode'),
      '@src': path.resolve(__dirname, 'src')
    },
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['javascript', 'typescript']
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'node_modules', 'onigasm', 'lib', 'onigasm.wasm'),
            to: path.join(__dirname, process.env.NODE_ENV !== 'production'? 'dist': 'build', 'onigasm.wasm')
          }
        ]
      }),
    ],
    configure: (webpackConfig => {
      webpackConfig.resolve.extensions = ['.wasm', ...webpackConfig.resolve.extensions];
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
      );

      // remove scope plugin
      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);

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
