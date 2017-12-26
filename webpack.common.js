const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src/web/module'),
  entry: ['./app/main.ts'],
  output: {
    path: __dirname + '/bin/web/app',
    filename: '[name].bundle.js',
  },
  devtool: 'eval',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({template: './index.html', cache: false}),
  ],
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader?-minimize',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              silent: true,
              configFileName: 'src/web/tsconfig.json',
            }
          }, 'angular2-template-loader'],
        include: [path.resolve(__dirname, 'src/web/module/app')],
      },
    ],
  },

  devServer: {
    host:'0.0.0.0',
    port:80,
    inline: true,
    stats: 'errors-only',
    historyApiFallback: true,
    contentBase: 'bin/web/app',
    proxy: {
      '/api/**/*': {
        target: 'http://localhost:8080',
        secure: false,
      },
    },
  },
};
