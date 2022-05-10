<template>
  <div class="space">
    <h3>移除流动性</h3>
    <n-input-group>
      <n-input v-model:value="form.uid" placeholder="请输入要接受的 MixinID" />
      <n-select :style="{ width: '33%' }" :options="selectOptions" v-model:value="form.tokenA" />
      <n-input v-model:value="resForm.amountA" disabled placeholder="流动性余额" />
      <n-select :style="{ width: '33%' }" :options="selectOptions" v-model:value="form.tokenB" />
      <n-input disabled v-model:value="resForm.amountB" placeholder="流动性余额" />
    </n-input-group>
    <n-input-group>
      <n-slider v-model:value="slideLiquidity" :step="1" />
      <n-input v-model:value="resForm.liquidity" disabled placeholder="流动性余额" />
    </n-input-group>
    <n-button type="primary" ghost @click="clickRemoveLiquidity" :disabled="btnDisable" :loading="btnLoading">获取转账二维码
    </n-button>
    <n-alert type="info" title="使用教程">
      <p>1. 选择 tokenA, 如(CNB)</p>
      <p>2. 选择 tokenB, 如(NXC)</p>
      <p>3. 输入要接收转账的 Mixin ID 如(30265)</p>
      <p>4. 点击获取转账二维码</p>
      <p>5. 等待二维码出来后扫码, 即完成移除.</p>
    </n-alert>
  </div>
  <Qrcode :show-modal="showQrcode" :code_id="code_id" @close="() => showQrcode = false" />
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { NInput, NButton, NAlert, NInputGroup, NSelect, useLoadingBar, useMessage, NSlider } from 'naive-ui'
import { SelectMixedOption } from 'naive-ui/lib/select/src/interface';
import Qrcode from '@/components/qrcode.vue';
import { getContractByUserIDs, Payment, } from 'mixin-node-sdk';
import { MVMRouterAddress } from '@/assets/statistic';
import { MixinClient } from '@/services/mixin';
import { BigNumber } from 'bignumber.js';
import { getPoolBalance, getAllTokens } from './tools'
import { computed } from '@vue/reactivity';
import { ApiGetPayment } from '@/services/api';


const loading = useLoadingBar()
const message = useMessage()

const form = reactive({
  uid: '',
  tokenA: '请选择 tokenA',
  tokenB: '请选择 tokenB',
})

const resForm = ref({
  totalLiquidity: '0',
  totalAmountA: '0',
  totalAmountB: '0',
  liquidity: '0',
  amountA: '0',
  amountB: '0',
})

const slideLiquidity = computed<number>({
  get() {
    const { totalLiquidity, liquidity } = resForm.value
    if (totalLiquidity === '0') return 0
    return Number(new BigNumber(liquidity).div(totalLiquidity).times(100).toFixed(18))
  },
  set(val) {
    const rate = new BigNumber(val).div(100)
    const { totalAmountA, totalAmountB, totalLiquidity } = resForm.value
    resForm.value = {
      ...resForm.value,
      liquidity: rate.times(totalLiquidity).toString(),
      amountA: rate.times(totalAmountA).toString(),
      amountB: rate.times(totalAmountB).toString(),
    }
  }
})

const selectOptions = ref<SelectMixedOption[]>()
const pair = ref('')

const clickRemoveLiquidity = async () => {
  loading.start()
  btnLoading.value = true
  const { tokenA, tokenB } = form
  const u = await MixinClient.readUser(form.uid)
  const userContract = await getContractByUserIDs(u.user_id)
  const payment = await ApiGetPayment({
    contractAddress: MVMRouterAddress,
    methodName: 'removeLiquidity',
    types: ['address', 'address', 'address', 'address', 'uint256', 'uint256', 'uint256'],
    values: [
      pair.value,
      tokenA,
      tokenB,
      userContract,
      new BigNumber(resForm.value.liquidity).times(1e18).toString(),
      0, 0
    ],
    options: { uploadkey: '123', delegatecall: true }
  }) as Payment
  code_id.value = payment.code_id
  showQrcode.value = true
  btnLoading.value = false
  loading.finish()
}

onMounted(async () => {
  const allTokens = await getAllTokens()
  selectOptions.value = Object.values(allTokens).map(token => ({
    label: token.symbol!,
    value: token.address!,
  }))
})

const btnDisable = ref(true)
const btnLoading = ref(false)
watch(form, async (n, o) => {
  const { tokenA, tokenB, uid } = form
  if (tokenA.startsWith('请选择') || tokenB.startsWith('请选择') || tokenA === tokenB || uid.length < 5) return
  btnLoading.value = true
  const res = await getPoolBalance(uid, tokenA, tokenB)
  if (typeof res === 'string') {
    btnLoading.value = false
    return message.error(res)
  }
  const [_liquidityAddress, userPool, token0, token1] = res
  pair.value = _liquidityAddress
  resForm.value = {
    totalLiquidity: userPool.toString(),
    totalAmountA: token0.toString(),
    totalAmountB: token1.toString(),
    liquidity: userPool.toString(),
    amountA: token0.toString(),
    amountB: token1.toString(),
  }
  btnLoading.value = false
  btnDisable.value = false
}, { immediate: true })


const showQrcode = ref(false)
const code_id = ref<string>("")
</script>
