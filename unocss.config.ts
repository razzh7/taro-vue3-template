import { defineConfig, presetAttributify, presetUno, presetTypography } from 'unocss'
import remToRpx from './build/rem2rpx'
export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetTypography(), remToRpx({ baseFontSize: 8 })]
})
