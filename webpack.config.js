const path = require('path');

function createConfigs(target) {
  return {
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `emis-api-client.${target}.js`,
      library: 'emisApiClient',
      libraryTarget: target,
      globalObject: 'this',
    },
    externals: {
      axios: {
        commonjs: 'axios',
        commonjs2: 'axios',
        amd: 'axios',
      },
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /(node_modules|bower_components)/,
          use: 'babel-loader',
        },
      ],
    },
  };
}

module.exports = [
  createConfigs('umd'),
  createConfigs('commonjs2'),
  createConfigs('var'),
];
