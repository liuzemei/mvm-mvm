
<template>
  <div class="space">
    <n-button @click="clickClean">清空</n-button>
    <n-button @click="clickFull('registry')">填入 registry</n-button>
    <n-button @click="clickFull('uniswap')">填入 mvmRouterUniswap</n-button>
  </div>
  <div class="space">
    <h3>请输入合约地址</h3>
    <n-input v-model:value="contractAddress" placeholder="请在此填入 abi..." />
  </div>
  <div class="space">
    <h3>请输入 abi</h3>
    <n-input v-model:value="abi" type="textarea" placeholder="请在此填入 abi..." class="abi-text" />
  </div>
  <div class="space">
    <n-select v-model:value="selectFunc" :options="selectList" />
  </div>
  <div v-if="selectItem">
    <n-input-group v-for="(item) in selectItem" class="params">
      <n-button :style="{ width: '100px' }" disabled>{{ item.name }}</n-button>
      <n-button type="primary" :style="{ width: '100px' }" disabled>{{ item.type }}</n-button>
      <n-input :style="{ width: '50%' }" v-model:value="item.value" />
    </n-input-group>
    <n-button v-if="selectFunc === 'addLiquidity'" @click="clickFill">填入默认值</n-button>
    <n-button type="info" @click="clickExec">执行</n-button>
  </div>
  <div class="space" v-if="res">
    <n-input v-model:value="res" type="textarea" class="abi-text" />
  </div>
</template>

<script setup lang="ts">
import { NInput, NButton, NSelect, NInputGroup, useLoadingBar } from 'naive-ui'
import { computed, onMounted, ref, watch } from 'vue'
import { RegistryABI, RegistryAddress, MVMRouterABI, MVMRouterAddress, CNBAddress } from '@/assets/statistic'
import { ABI } from '@/types'
import { getContract } from '@/services/ethers';
const abi = ref(JSON.stringify(MVMRouterABI))
const contractAddress = ref(MVMRouterAddress)
const loading = useLoadingBar()

const clickFull = (type: string) => {
  if (type === 'uniswap') {
    abi.value = JSON.stringify(MVMRouterABI)
    contractAddress.value = MVMRouterAddress
  }
  if (type === 'registry') {
    abi.value = JSON.stringify(RegistryABI)
    contractAddress.value = RegistryAddress
  }
}

const clickClean = () => {
  abi.value = ''
  contractAddress.value = ''
}

const clickFill = () => {
  selectItem.value[0].value = CNBAddress
  selectItem.value[1].value = "0"
}

const selectFunc = ref('')
const selectList = computed<{ label: string, value: string }[]>(() => {
  if (!abi.value) {
    selectFunc.value = ''
    return []
  }
  const list: any = []
  const abiArr: ABI[] = JSON.parse(abi.value)
  abiArr.forEach(item => {
    if (item.type === 'function') {
      list.push({
        label: item.name,
        value: item.name
      })
    }
  })
  selectFunc.value = list[0].value
  return list
})
const selectItem = ref()
watch([selectList, abi, selectFunc], (o, v) => {
  if (!selectList.value || !abi.value) return selectItem.value = undefined
  else return selectItem.value = JSON.parse(abi.value)
    .find((v: any) => v.name === selectFunc.value)
    .inputs.map((v: any) => ({ ...v, value: '' }))
})
onMounted(() => {
  if (!selectList.value || !abi.value) return selectItem.value = undefined
  else return selectItem.value = JSON.parse(abi.value)
    .find((v: any) => v.name === selectFunc.value)
    .inputs.map((v: any) => ({ ...v, value: '' }))
})


const res = ref("")

const clickExec = async () => {
  loading.start()
  const params = selectItem.value.map((v: any) => v.value)
  let _res: any = await execContract(abi.value, contractAddress.value, selectFunc.value, params)
  if (_res) {
    if (typeof _res === 'object') {
      _res = JSON.stringify(_res, null, 2)
    }
    res.value = _res
  }
  loading.finish()
}

async function execContract(abi: string, address: string, method: string, args: any[]): Promise<string> {
  const t = await getContract(address, abi)
  return t[method](...args, {
    gasLimit: 10000000
  })
}

</script>
<style>
.abi-text {
  height: 200px;
}

.params {
  margin: 5px 0;
}
</style>