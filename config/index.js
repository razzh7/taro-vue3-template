import { resolve } from 'path'
import UnoCSS from '@unocss/webpack'

const webpackChain = chain => {
  if (process.env.TARO_ENV === 'h5') {
    chain.plugin('analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
  }
  chain.plugin('unocss').use(UnoCSS())
}

const config = {
  projectName: 'myApp',
  date: '2022-6-18',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-html'],
  sass: {
    resource: [resolve(__dirname, '..', 'src/styles/custom_theme.scss')], // 自定义主题样式
    data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`
  },
  defineConstants: {},
  copy: {
    patterns: [],
    options: {}
  },
  // 路径别名配置：需要在 tsconfig.json 的 paths 也配置一下
  alias: {
    '@/components': resolve(__dirname, '..', 'src/components')
  },
  framework: 'vue3',
  compiler: 'webpack5',
  mini: {
    webpackChain,
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    webpackChain,
    publicPath: '/',
    esnextModules: ['nutui-taro'],
    staticDirectory: 'static',
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
