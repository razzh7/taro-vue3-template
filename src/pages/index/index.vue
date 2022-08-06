<script setup lang="ts">
import MyDialog from '@/components/Dialog/index.vue'
import MyButton from '@/components/Button/index.vue'
</script>

<template>
  <MyDialog></MyDialog>
  <view class="text-center">
    <view class="mb-5">全局组件</view>
    <MyButton></MyButton>
  </view>
  <view class="mt-10 text-center">
    <text class="c-blue">UnoCss样式</text>
  </view>
</template>
