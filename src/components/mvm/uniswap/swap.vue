<template>
  <div class="space">
    <h3>兑换</h3>
    <n-input-group>
      <n-input v-model:value="liquidityForm.amountA" placeholder="请输入要转账的金额" />
      <n-select
        :style="{ width: '33%' }"
        :options="selectOptions"
        v-model:value="liquidityForm.tokenA"
      />
      <n-input disabled v-model:value="liquidityForm.amountB" placeholder="最小获得的金额" />
      <n-select
        :style="{ width: '33%' }"
        :options="selectOptions"
        v-model:value="liquidityForm.tokenB"
      />
    </n-input-group>
    <n-button type="primary" ghost @click="clickUploadParams()">上传转账参数</n-button>
    <n-button type="primary" :disabled="!params" ghost @click="clickAddLiquidity">获取转账二维码</n-button>
    <n-alert type="info" title="使用教程">
      <p>1. 选择 tokenA</p>
      <p>2. 选择 tokenB</p>
      <p>3. 左侧输入要兑换的金额</p>
      <p>4. 如果右侧未出现数字, 说明没有流动性, 请切换 token,如 CNB/NXC</p>
      <p>5. 点击左侧获取转账二维码完成转账</p>
      <p>6. 完成兑换</p>
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
import { CNBAmount, CNBAssetID, MVMRouterAddress, RegistryABI, RegistryAddress, RegistryProcess, RouterAddress } from '@/assets/statistic';
import { MixinClient } from '@/ethers/mixin';
import { BigNumber } from 'bignumber.js';
import { getAllTokens, getExactOut } from './tools'
import { getContract } from '@/ethers';
import { keccak256 } from 'ethers/lib/utils';

const loading = useLoadingBar()

const liquidityForm = reactive({
  tokenA: '请选择 tokenA',
  amountA: '',
  tokenB: '请选择 tokenB',
  amountB: '',
})
const selectOptions = ref<SelectMixedOption[]>()

const params = ref('')

const clickUploadParams = async () => {
  let { amountA, amountB, tokenA, tokenB } = liquidityForm
  amountA = new BigNumber(amountA).times(1e8).toString()
  amountB = new BigNumber(amountB).times(1e8).toString()
  const time = Math.ceil(Date.now() / 1000) + 300
  const extra = extraGeneratByInfo(
    RouterAddress,
    'swapExactTokensForTokens',
    ['uint256', 'uint256', 'address[]', 'address', 'uint256'],
    [amountA, amountB, [tokenA, tokenB], '0xE31982fbeD447a6bdeCd93Cb74c1f2309101d41e', time],
  )
  console.log(extra)
  const registryContract = await getContract(RegistryAddress, RegistryABI)
  await registryContract.writeParams('0x' + extra)
  const res = keccak256('0x' + extra).slice(2)
  params.value = RegistryProcess.replaceAll('-', '') + res
  console.log(params.value)
}

const clickAddLiquidity = async () => {
  loading.start()
  tx.value = getMvmTransaction({
    asset: CNBAssetID,
    amount: '1',
    extra: params.value,
    trace: MixinClient.newUUID(),
    process: RegistryProcess,
  })
  showQrcode.value = true
  loading.finish()
}

onMounted(async () => {
  const allTokens = await getAllTokens()
  // getExactOut('0xeb0393eb61c1f6605206289729f7Cfc76be4bDda', '0x3b04E1AfED9EE02AA6EB4B99ceBe3b3b4A966cf4', '1')
  selectOptions.value = Object.values(allTokens).map(token => ({
    label: token.symbol!,
    value: token.address!,
  }))
})

const rate = ref(0)
watch(liquidityForm, async (n, o) => {
  const { tokenA, tokenB, amountA } = liquidityForm
  if (tokenA.startsWith('请选择') || tokenB.startsWith('请选择') || tokenA === tokenB || amountA === '') return
  const _rate = await getExactOut(tokenA, tokenB, amountA)
  if (_rate) {
    liquidityForm.amountB = _rate
    "in, outMin, path, to, timestamp"
    "swapExactTokensForTokens(uint256,uint256,address[],address,uint256)"
    ""
  }
}, { immediate: true })


const showQrcode = ref(false)
const tx = ref<TransactionInput>()
</script>
