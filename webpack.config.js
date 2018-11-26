var path = require('path')

var webpack = require('webpack')

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: [{
      //       loader: 'babel-loader',
      //       options: {
      //         presets: ['es2015'],
      //         cacheIdentifier: false
      //       }
      //     }
      //   ]
      // }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#cheap-module-eval-source-map'
}
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"' // 定义生产环境全局变量
      }
    }),
    // new UglifyJsPlugin(), // 压缩js
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // webpack为每个模块指定唯一的id，通过该插件，webpack会分析和为模块按优先级排序，为最经常使用的分配一个最小的ID
    // 优化插件
    new webpack.optimize.OccurrenceOrderPlugin()
  ])
}