<template>
  <div class="space">
    <h3>ProcessID</h3>
    <n-input v-model:value="process" placeholder="请输入 process id" />
    <NAlert type="info">
      合约地址:
      <a :href="`https://testnet.mvmscan.com/address/${RegistryAddress}/transactions`" target="_blank">{{
          RegistryAddress
      }}</a>
    </NAlert>
  </div>

  <div class="space">
    <h3>参数生成器</h3>
    <n-input v-model:value="extraGen.address" placeholder="请输入要调用的合约地址" />
    <n-input v-model:value="extraGen.method_name" placeholder="请输入方法名称. eg: addLiquidity" />
    <n-input v-model:value="extraGen.method_type" placeholder="请输入参数类型. eg: address,uint256" />
    <n-input v-model:value="extraGen.params" placeholder="请输入参数. eg: 0xeb0393eb61c1f6605206289729f7Cfc76be4bDda,1" />
    <n-row>
      <p>是否是 Delegatecall</p>
      <n-switch v-model:value="isDelegatecall" />
    </n-row>
    <n-button ghost @click="extraGen = testParams">填入测试数据</n-button>
    <n-button ghost @click="extraGen = JSON.parse(JSON.stringify(emptyExtra))">清空数据</n-button>
    <n-button type="primary" ghost @click="clickGenerateExtra" :loading="isGenerate">生成参数</n-button>
    <template v-if="extraRes">
      <n-input v-model:value="extraRes" type="textarea" class="abi-text" />
    </template>
  </div>
  <div class="space" v-if="extraRes"></div>

  <div class="space">
    <h3>Mixin调用器</h3>
    <n-input v-model:value="txInput.asset" placeholder="请输入 asset_id" />
    <n-input v-model:value="txInput.amount" placeholder="请输入 amount" />
    <n-input v-model:value="txInput.extra" placeholder="请输入 extra" />
    <n-button ghost @click="txInput = JSON.parse(JSON.stringify(testInput))">填入测试数据</n-button>
    <n-button ghost @click="extraGen = JSON.parse(JSON.stringify(emptyInput))">清空数据</n-button>
    <n-button type="primary" ghost @click="clickGenerateTxInput">生成二维码</n-button>
  </div>

  <Qrcode :show-modal="showQrcode" :tx="tx" @close="() => showQrcode = false" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Qrcode from '@/components/qrcode.vue';
import { NInput, NButton, NAlert, NSwitch, NRow } from 'naive-ui';
import { extraGenerateByInfo, getMvmTransaction, TransactionInput } from 'mixin-node-sdk';
import { MixinClient } from '@/services/mixin';
import { testParams, testInput } from './testData';
import { RegistryProcess, RegistryAddress } from '@/assets/statistic';

const process = ref(RegistryProcess);

const showQrcode = ref(false);
const tx = ref<TransactionInput>();

const emptyExtra = {
  address: '',
  method_name: '',
  method_type: '',
  params: '',
};

const extraGen = ref(emptyExtra);
const extraRes = ref('');
const isDelegatecall = ref(false);
const isGenerate = ref(false);
const clickGenerateExtra = async () => {
  isGenerate.value = true;
  let { address, method_name, method_type, params } = extraGen.value;
  let op = 0;
  if (isDelegatecall.value) {
    op = 2;
  }
  if (address.startsWith('0x')) address = address.slice(2);
  extraRes.value = await extraGenerateByInfo({
    contractAddress: address,
    methodName: method_name,
    types: method_type.split(','),
    values: params.split(','),
    options: {
      uploadkey: '123',
      delegatecall: isDelegatecall.value,
    },
  });
  isGenerate.value = false;
};


const emptyInput = {
  asset: '',
  amount: '',
  extra: '',
};

const txInput = ref(emptyInput);

const clickGenerateTxInput = () => {
  const { asset, amount, extra } = txInput.value;
  tx.value = getMvmTransaction({
    asset, amount, extra,
    trace: MixinClient.newUUID(),
    process: process.value,
  });
  showQrcode.value = true;
};


</script>
