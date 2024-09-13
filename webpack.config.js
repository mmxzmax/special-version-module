const fs = require('fs');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const globImporter = require('node-sass-glob-importer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ImageminPlugin = require('imagemin-webpack-plugin').default;


let plugins = [];
let page;
let links = [];

fs.readdirSync('./src/').forEach(file => {
  if (String(file).endsWith('.pug')) {
    page = new HtmlWebPackPlugin({
      template: `./src/${path.basename(file, '.pug')}.pug`,
      filename: `./${path.basename(file, '.pug')}.html`,
    });
    links.push({
      link: `./${path.basename(file, '.pug')}.html`,
      title: path.basename(file, '.pug')
    });
    plugins.push(page)
  }
});

plugins.push(
  new HtmlWebPackPlugin({
    template: `./src/list-template/${path.basename('list.pug', '.pug')}.pug`,
    filename: `${path.basename('list.pug', '.pug')}.html`,
  })
);
plugins.push(new MiniCssExtractPlugin({
  filename: "[name].css",
  chunkFilename: "[id].css"
}));
plugins.push(new SpriteLoaderPlugin());
plugins.push(new SpriteLoaderPlugin(new CopyWebpackPlugin({
  patterns: [
    { from: 'src/public', to: './' },
  ],
})));
plugins.push(new ImageminPlugin({
  pngquant: {
    quality: '95-100'
  }
}));




module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: '9900',
    open: ['/list.html']
  },
  watch: true,
  watchOptions: {
    poll: 1000,
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader"
        },
        exclude: [/node_modules/]
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                importer: globImporter()
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name(file) {
                if (process.env.NODE_ENV === 'development') {
                  return 'assets/images/[hash].[ext]';
                }

                return 'assets/images/[name].[ext]';
              },
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name(file) {
                if (process.env.NODE_ENV === 'development') {
                  return 'assets/fonts/[hash].[ext]';
                }

                return 'assets/fonts/[name].[ext]';
              },
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          { loader: 'svg-sprite-loader', options: { symbolId: filePath => path.basename(filePath, '.svg') } },
          'svg-fill-loader',
          'svgo-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: plugins,
  entry: {
    lib: './src/index.js',
    page: './pg/index.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
};




