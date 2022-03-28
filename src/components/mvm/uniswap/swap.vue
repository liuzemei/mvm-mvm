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
    <n-input v-model:value="identity_number" placeholder="请输入要接受的MixinID, 如: 30265" />
    <n-button type="primary" ghost @click="clickUploadParams()">上传转账参数</n-button>
    <n-button type="primary" :disabled="!params" ghost @click="clickAddLiquidity">获取转账二维码</n-button>
    <n-alert type="info" title="使用教程">
      <p>1. 选择 tokenA</p>
      <p>2. 选择 tokenB</p>
      <p>3. 左侧输入要兑换的金额</p>
      <p>4. 如果右侧未出现数字, 说明没有流动性, 请切换 token,如 CNB/NXC</p>
      <p>5. 输入收款人的 MixinID(确保用户已经注册过了,否则调用失败.调用失败后即完成注册, 可以重新获取二维码付款)</p>
      <p>6. 点击上传转账参数(请使用 metamask 调用, 并完成支付)</p>
      <p>7. 点击获取转账二维码完成转账</p>
      <p>8. 在钱包内查看兑换的币种, 完成兑换</p>
    </n-alert>
  </div>
  <Qrcode :show-modal="showQrcode" :tx="tx" @close="() => showQrcode = false" />
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { NInput, NButton, NAlert, NInputGroup, NSelect, useLoadingBar } from 'naive-ui'
import { SelectMixedOption } from 'naive-ui/lib/select/src/interface';
import Qrcode from '@/components/qrcode.vue';
import { extraGeneratByInfo, getContractByUserIDs, getMvmTransaction, TransactionInput } from 'mixin-node-sdk';
import { RegistryABI, RegistryAddress, RegistryProcess, RouterAddress } from '@/assets/statistic';
import { MixinClient } from '@/ethers/mixin';
import { BigNumber } from 'bignumber.js';
import { getExactOut } from './tools'
import { getContract } from '@/ethers';
import { keccak256 } from 'ethers/lib/utils';
import { _selectOptions, _addrAssetMap } from './testData'

const loading = useLoadingBar()

const liquidityForm = reactive({
  tokenA: '请选择 tokenA',
  amountA: '',
  tokenB: '请选择 tokenB',
  amountB: '',
})
const selectOptions = ref<SelectMixedOption[]>(_selectOptions)

const params = ref('')
const identity_number = ref('')

const clickUploadParams = async () => {
  let { amountA, amountB, tokenA, tokenB } = liquidityForm
  amountA = new BigNumber(amountA).times(1e8).toString()
  amountB = new BigNumber(amountB).times(1e8).toString()
  const time = Math.ceil(Date.now() / 1000) + 300
  const u = await MixinClient.readUser(identity_number.value)
  const userContract = await getContractByUserIDs(u.user_id, undefined, RegistryAddress)
  const extra = '0x' + extraGeneratByInfo(
    RouterAddress,
    'swapExactTokensForTokens',
    ['uint256', 'uint256', 'address[]', 'address', 'uint256'],
    [amountA, amountB, [tokenA, tokenB], userContract, time],
  )
  const registryContract = await getContract(RegistryAddress, RegistryABI)
  await registryContract.writeParams(extra)
  const res = keccak256(extra)
  console.log("key:", res)
  console.log("res:", extra)
  params.value = RegistryProcess.replaceAll('-', '') + res.slice(2)
}

const clickAddLiquidity = async () => {
  loading.start()
  tx.value = getMvmTransaction({
    asset: _addrAssetMap[liquidityForm.tokenA],
    amount: liquidityForm.amountA,
    extra: params.value,
    trace: MixinClient.newUUID(),
    process: RegistryProcess,
  })
  showQrcode.value = true
  loading.finish()
}

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
