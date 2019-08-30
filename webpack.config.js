const path = require(`path`);
const buildPath = path.join(__dirname, `public`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: buildPath
  },
  devtool: `source-map`,
  devServer: {
    contentBase: buildPath,
    publicPath: '/',
    compress: true,
    watchContentBase: true
  }
};
