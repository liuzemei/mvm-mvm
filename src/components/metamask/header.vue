<template>
  <n-row>
    <n-col :span="8">
      <n-statistic label="ChainID">{{ user.network || "点击登录获取" }}</n-statistic>
    </n-col>
    <n-col :span="8">
      <n-statistic label="余额">{{ user.balance || "点击登录获取" }}</n-statistic>
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="24">
      <n-statistic label="地址">{{ user.address || "点击登录获取" }}</n-statistic>
    </n-col>
  </n-row>
  <n-button v-if="!user.network" @click="clickLogin">登陆</n-button>
</template>

<script setup lang="ts" >
import { reactive } from 'vue'
import { formatEth, getSigner } from '@/services/ethers';
import { NButton, NRow, NCol, NStatistic, useLoadingBar } from 'naive-ui'
const loadingBar = useLoadingBar()
const user = reactive({
  address: '',
  balance: '',
  network: 0
})


async function clickLogin() {
  loadingBar.start()
  const t = await getSigner()
  const address = await t.getAddress()
  const balanceWei = await t.getBalance()
  const network = await t.provider.getNetwork()
  const balance = await formatEth(balanceWei)
  user.address = address
  user.balance = balance
  user.network = network.chainId
  loadingBar.finish()
}

</script>