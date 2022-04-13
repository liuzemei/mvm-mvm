<template>
  <div class="space">
    <h3>添加流动性</h3>
    <n-input-group>
      <n-input v-model:value="liquidityForm.amountA" placeholder="请输入要转账的金额" />
      <n-select :style="{ width: '33%' }" :options="selectOptions" v-model:value="liquidityForm.tokenA" />
      <n-button type="primary" ghost @click="clickAddLiquidity('A')">获取转账二维码</n-button>
      <n-input :disabled="rate != 0" v-model:value="liquidityForm.amountB" placeholder="要转账的金额" />
      <n-select :style="{ width: '33%' }" :options="selectOptions" v-model:value="liquidityForm.tokenB" />
      <n-button type="primary" ghost @click="clickAddLiquidity('B')">获取转账二维码</n-button>
    </n-input-group>
    <n-alert type="info" title="使用教程">
      <p>1. 选择 tokenA</p>
      <p>2. 选择 tokenB</p>
      <p>3. 左侧输入流动性</p>
      <p>4. 如果右侧可以输入数字, 则说明该交易对流动性未添加, 可以初始化配对金额</p>
      <p>5. 分别点击左右二维码并完成转账</p>
      <p>6. 完成流动性添加</p>
    </n-alert>
  </div>
  <Qrcode :show-modal="showQrcode" :tx="tx" @close="() => showQrcode = false" />
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { NInput, NButton, NAlert, NInputGroup, NSelect, useLoadingBar } from 'naive-ui'
import { SelectMixedOption } from 'naive-ui/lib/select/src/interface';
import Qrcode from '@/components/qrcode.vue';
import { extraGeneratByInfo, getMvmTransaction, TransactionInput } from 'mixin-node-sdk';
import { getAssetIDByAddress } from 'mixin-node-sdk'
import { MVMRouterAddress, RegistryAddress, RegistryProcess } from '@/assets/statistic';
import { MixinClient } from '@/services/mixin';
import { BigNumber } from 'bignumber.js';
import { getAllTokens, getRateByAddress } from './tools'

const loading = useLoadingBar()

const liquidityForm = reactive({
  tokenA: '请选择 tokenA',
  amountA: '',
  tokenB: '请选择 tokenB',
  amountB: '',
})
const selectOptions = ref<SelectMixedOption[]>()

const clickAddLiquidity = async (type: 'A' | 'B') => {
  loading.start()
  let token = liquidityForm[`token${type}`]
  let amount = liquidityForm[`amount${type}`]
  const asset = await getAssetIDByAddress(token, RegistryAddress)
  const extra = '00' + extraGeneratByInfo(
    MVMRouterAddress,
    'addLiquidity',
    ['address', 'uint256'],
    [token, new BigNumber(amount).times(1e8).toString()],
  )
  tx.value = getMvmTransaction({
    asset,
    amount,
    extra,
    trace: MixinClient.newUUID(),
    process: RegistryProcess,
  })
  showQrcode.value = true
  loading.finish()
}

onMounted(async () => {
  const allTokens = await getAllTokens()

  selectOptions.value = Object.values(allTokens).map(token => ({
    label: token.symbol!,
    value: token.address!,
  }))
})

const rate = ref(0)
watch(liquidityForm, async (n, o) => {
  const { tokenA, tokenB, amountA } = liquidityForm
  if (tokenA.startsWith('请选择') || tokenB.startsWith('请选择') || tokenA === tokenB) return
  const _rate = await getRateByAddress(tokenA, tokenB)
  rate.value = _rate
  if (_rate && amountA) {
    liquidityForm.amountB = new BigNumber(amountA).times(_rate).toFixed(8)
  }
}, { immediate: true })


const showQrcode = ref(false)
const tx = ref<TransactionInput>()
</script>
