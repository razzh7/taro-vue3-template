<template>
  <view class="index">
    <text>{{ msg }}</text>
  </view>
</template>

<script>
import { ref } from 'vue'
import './index.scss'

export default {
  setup() {
    const msg = ref('调试changelog8')
    const bug = ref('假装修了一个bug2')
    return {
      msg,
      bug
    }
  }
}
</script>
