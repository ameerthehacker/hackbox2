const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  webpack: {
    alias: {},
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['javascript', 'json', 'typescript', 'css', 'html']
      })
    ]
  },
};
