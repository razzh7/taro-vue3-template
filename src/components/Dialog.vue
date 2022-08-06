<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
    const visible = ref(false)
    const visible1 = ref(false)
    const componentClick = () => {
      visible.value = true
    }
    const componentvVrticalClick = () => {
      visible1.value = true
    }
    return { visible, visible1, componentClick, componentvVrticalClick }
  }
}
</script>

<template>
  <nut-cell-group title="标签式使用">
    <nut-cell title="组件调用" @click="componentClick"></nut-cell>
    <nut-dialog
      teleport="#app"
      title="组件调用"
      content="如果需要在弹窗内嵌入组件或其他自定义内容，可以使用组件调用的方式。"
      v-model:visible="visible"
    >
    </nut-dialog>
    <nut-cell title="底部按钮 垂直使用" @click="componentvVrticalClick"></nut-cell>
    <nut-dialog
      footer-direction="vertical"
      teleport="#app"
      title="组件调用"
      content="如果需要在弹窗内嵌入组件或其他自定义内容，可以使用组件调用的方式。"
      v-model:visible="visible1"
    >
    </nut-dialog>
  </nut-cell-group>
</template>
