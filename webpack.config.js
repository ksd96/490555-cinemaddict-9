// eslint-disable-next-line strict
const path = require(`path`);
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
  }
};
