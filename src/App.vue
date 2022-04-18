<template>
  <n-message-provider>
    <n-loading-bar-provider class="app">
      <n-tabs type="line">
        <n-tab-pane name="the beatles" tab="MVM">
          <MVM />
        </n-tab-pane>
        <n-tab-pane name="oasis" tab="Metamask">
          <HelloWorld />
        </n-tab-pane>
      </n-tabs>
    </n-loading-bar-provider>
  </n-message-provider>
</template>
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from '@/components/metamask/index.vue'
import MVM from '@/components/mvm/index.vue'
import { NLoadingBarProvider, NMessageProvider, NTabs, NTabPane } from 'naive-ui'
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

#app {
  margin: 20px;
}

.space {
  margin: 20px 0;
}
</style>