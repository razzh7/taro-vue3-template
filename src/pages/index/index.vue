<script setup lang="ts">
import MyDialog from '@/components/Dialog/Dialog.vue'
import MyButton from '@/components/Button/Button.vue'
// @ts-ignore
import PlatFormComponent from '@/components/Platform/Platform'
</script>

<template>
  <view>
    <MyDialog />
    <view class="text-center">
      <view class="mb-5px text-fuchsia">按钮组件</view>
      <MyButton />
    </view>
    <view class="mt-10px text-center">
      <text class="text-blue/500">UnoCss样式</text>
    </view>
    <view class="text-center text-fuchsia">
      <view class="mb-5px">多平台组件</view>
      <PlatFormComponent />
    </view>
  </view>
</template>
