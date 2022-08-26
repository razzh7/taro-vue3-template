import { defineConfig } from 'unocss'
import presetWeapp from 'unocss-preset-weapp'
export default defineConfig({
  presets: [
    presetWeapp({
      isH5: process.env.TARO_ENV === 'h5',
      platform: 'taro',
      taroWebpack: 'webpack5'
    })
  ]
})
