<script setup lang="ts">
import MyDialog from '@/components/Dialog.vue'
import MyButton from '@/components/Button.vue'
</script>

<template>
  <view>
    <MyDialog></MyDialog>
    <view class="text-center">
      <view class="mb-5px">按钮组件</view>
      <MyButton></MyButton>
    </view>
    <view class="mt-10px text-center">
      <text class="text-blue/500">UnoCss样式</text>
    </view>
  </view>
</template>
