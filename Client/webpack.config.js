var autoprefixer = require('autoprefixer');
const webpack = require('webpack');


module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    },
    {
      test:   /\.css$/,
      loader: "style-loader!css-loader!postcss-loader"
    }]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
],
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
