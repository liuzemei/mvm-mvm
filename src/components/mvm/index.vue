<script setup lang="ts">
import { NTabs, NTabPane } from 'naive-ui'
import Brige from './brige.vue'
import Mvm from './mvm.vue'
</script>

<template>
  <div>
    <n-tabs type="segment">
      <n-tab-pane name="chap1" tab="MVM 调用">
        <mvm />
      </n-tab-pane>
      <n-tab-pane name="chap2" tab="跨链桥">
        <brige />
      </n-tab-pane>
      <!-- <n-tab-pane name="chap2" tab="兑换"></n-tab-pane> -->
    </n-tabs>
  </div>
</template>
