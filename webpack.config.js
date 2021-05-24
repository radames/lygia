const path = require('path')

const config = {
  mode: 'production',
  entry: {
    main: './index.js',
    animation: './animation',
    color: './color',
    distort: './distort',
    draw: './draw',
    filter: './filter',
    generative: './generative',
    math: './math',
    operation: './operation',
    sdf: './sdf',
    space: './space',
  },
  module: {
    rules: [
      {
        test: /\.glsl$/,
        use: {
          loader: 'webpack-glsl-loader',
        },
      },
    ],
  },
}

const targetModule = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'module/lygia.[name].js',
    libraryTarget: 'module',
  },
  experiments: {
    outputModule: true,
  },
}
const targetUmd = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'umd/lygia.[name].js',
    library: {
      root: 'Lygia',
      amd: 'lygia',
      commonjs: 'lygia',
    },
    libraryTarget: 'umd',
  },
}

module.exports = [
  Object.assign({}, config, targetUmd),
  Object.assign({}, config, targetModule),
]
