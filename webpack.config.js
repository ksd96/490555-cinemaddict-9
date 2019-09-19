const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);
// eslint-disable-next-line no-undef
const outputFile = path.join(__dirname, `public`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: outputFile
  },
  devtool: `source-map`,
  devServer: {
    contentBase: outputFile,
    publicPath: `http://localhost:8080/`,
    compress: true,
    watchContentBase: true
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`],
    }),
  ],
};
