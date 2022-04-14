<template>
  <n-alert title="注意" type="warning">所有 mixin messager 对 mvm 的合约调用, 都是通过转账触发的. 对于不需要转账的合约调用, 一律使用 0.00000001 CNB
    来触发交易.(会退回)</n-alert>
  <div class="space">
    <h3>绑定账户</h3>
    <n-input-group>
      <n-input v-model:value="bind" placeholder="请输入 metamask 的钱包地址" />
      <n-button type="primary" ghost @click="clickBind">获取转账二维码</n-button>
    </n-input-group>
  </div>
  <n-alert title="注意" type="warning">
    <p>1. 点击绑定后, 用 mixin messenger 扫码支付.</p>
    <p>2. 此处输入 metamask 或者 imtoken... 的以太坊地址</p>
    <p>
      3. 注意需要添加 mvm 的网络,
      <a href="https://developers.mixin.one/zh-CN/docs/mainnet/mvm/metamask">Metamask配置教程请点击</a>
    </p>
    <p>4. 后续的跨链转账操作, 需要跟绑定扫码支付的 mixin 用户一致. 如果更换了 mixin messenger 用户, 请重新绑定账户.</p>
  </n-alert>

  <div class="space">
    <h3>跨链转账</h3>
    <n-input v-model:value="transfer.asset_id" placeholder="请输入资产asset_id" />
    <n-input-group>
      <n-input v-model:value="transfer.amount" placeholder="请输入要转账的金额" />
      <n-button type="primary" ghost @click="clickTransfer">获取转账二维码</n-button>
    </n-input-group>
  </div>

  <n-alert title="注意" type="warning">
    <p>1. 跨链转账之前请先绑定账户</p>
    <p>2. 获取转账二维码然后用 mixin 扫码支付 (要跟上一步扫码的 mixin 是同一个用户, 请不要更换用户扫码.)</p>
    <p>3. 请先确认资产合约地址存在, 请在下方的输入框中输入 资产的 asset_id 或者 symbol 来获取. 如: CNB的 asset_id
      为:[965e5c6e-434c-3fa9-b780-c50f43cd955c], symbol 为: [CNB]</p>
    <p>4. 转账成功后, 稍等片刻, 就会在账户中显示了.(首次转入资产, 需要在钱包中导入资产合约地址)</p>
    <p>5. 如果需要转回 mixin messenger 直接在下方根据 user_id 或者 mixin id 搜索您的合约地址, 然后直接通过钱包给该合约地址转账, 您的 messenger 就会收到指定资产了.</p>
  </n-alert>

  <div class="space">
    <h3>用户合约地址查询: 输入用户的 user_id 或 mixin id</h3>
    <n-input-group>
      <n-input v-model:value="user.search" placeholder="请输入 user_id 或 mixin id" />
      <n-button type="primary" ghost @click="clickSearch('user')">搜索</n-button>
    </n-input-group>
    <n-input v-if="user.res" v-model:value="user.res" type="textarea" />
  </div>

  <n-alert title="注意" type="warning">
    <p>1. 初次使用的用户, 是无法搜索到的, 可以先通过上述绑定账户来注册合约. 注册(转账)成功后, 就可以在这里搜索到了.</p>
    <p>2. 直接从钱包里给搜索到的合约地址转账, 就会在 mixin messenger 里收到转账了.(注意, 这里不会有转账的消息提醒, 可以直接在钱包中查看余额)</p>
  </n-alert>

  <div class="space">
    <h3>资产合约地址查询: 输入资产的 asset_id 或 symbol</h3>
    <n-input-group>
      <n-input v-model:value="asset.search" placeholder="请输入 asset_id 或 symbol" />
      <n-button type="primary" ghost @click="clickSearch('asset')">搜索</n-button>
      <n-button type="primary" ghost @click="clickAddAsset">添加资产</n-button>
    </n-input-group>
    <n-input v-if="asset.res" v-model:value="asset.res" type="textarea" />
  </div>

  <n-alert title="注意" type="warning">
    <p>1. mvm 中初次使用的资产, 是无法搜索到的</p>
    <p>2. 无法搜索到的资产, 请先点击添加资产, 给 mvm 合约转账后, 成功后稍等一会再点击搜索. (资产会自动退回)</p>
  </n-alert>
  <qrcode v-if="showTxCode" :tx="tx" :show-modal="showTxCode" @close="closeTxCode" />
</template>

<script setup lang="ts">
import { NInput, NInputGroup, NButton, useLoadingBar, useMessage, NAlert } from 'naive-ui'
import { getContractByUserIDs, getContractByAssetID, getMvmTransaction, searchNetworkAsset, extraGeneratByInfo, TransactionInput } from 'mixin-node-sdk'
import { reactive, ref } from 'vue';
import { MixinClient } from '@/services/mixin'
import { parse } from 'uuid'
import { BridgeAddress, CNBAmount, CNBAssetID, RegistryAddress, RegistryProcess } from '@/assets/statistic';
import { BigNumber } from 'BigNumber.js'
import qrcode from '@/components/qrcode.vue';

const loading = useLoadingBar()
const message = useMessage()

const nullAddress = '0x0000000000000000000000000000000000000000'

// 绑定账户
const bind = ref('')

const clickBind = async () => {
  loading.start()
  const extra = await extraGeneratByInfo({
    contractAddress: BridgeAddress,
    methodName: 'bind',
    types: ['address'],
    values: [bind.value]
  })
  const tx = getMvmTransaction({
    asset: CNBAssetID,
    amount: CNBAmount,
    extra,
    trace: MixinClient.newUUID(),
    process: RegistryProcess
  })
  showTxCodeModal(tx)
  loading.finish()
}

// 跨链转账
const transfer = reactive({
  asset_id: '',
  amount: ''
})

const clickTransfer = async () => {
  loading.start()
  const contract = await getContractByAssetID(transfer.asset_id, RegistryAddress)
  const extra = await extraGeneratByInfo({
    contractAddress: BridgeAddress,
    methodName: 'deposit',
    types: ['address', 'uint256'],
    values: [contract, new BigNumber(transfer.amount).times(1e8).toString()]
  })
  const tx = getMvmTransaction({
    asset: transfer.asset_id,
    amount: transfer.amount,
    extra,
    trace: MixinClient.newUUID(),
    process: RegistryProcess
  })
  showTxCodeModal(tx)
  loading.finish()
}

// ----------- 搜索相关
const user = reactive({
  search: '',
  res: ''
})

const asset = reactive({
  search: '',
  res: ''
})

const clickSearch = async (type: string) => {
  loading.start()
  try {
    if (type === 'user') {
      const u = await MixinClient.readUser(user.search)
      if (!u.user_id)
        throw new Error('用户不存在')
      const userContract = await getContractByUserIDs(u.user_id, undefined, RegistryAddress)
      if (userContract === nullAddress)
        throw new Error('用户未注册, 请先完成注册')
      user.res = userContract
    }
    if (type === 'asset') {
      let asset_id = await getAssetIDBySearch()
      const assetContract = await getContractByAssetID(asset_id, RegistryAddress)
      if (assetContract === nullAddress)
        throw new Error('资产未注册, 请先添加资产')
      asset.res = assetContract
    }
    loading.finish()
  } catch (e: any) {
    message.error(e.message)
    loading.error()
  }
}


// 点击添加资产
const clickAddAsset = async () => {
  loading.start()
  try {
    const asset = await getAssetIDBySearch()
    const txInput = getMvmTransaction({
      asset,
      amount: '0.00000001',
      extra: '',
      trace: MixinClient.newUUID(),
      process: RegistryProcess
    })

    showTxCodeModal(txInput)
    loading.finish()
  } catch (e: any) {
    message.error(e.message)
    loading.error()
  }
}



// 获取 asset_id
const getAssetIDBySearch = async (): Promise<string> => {
  try {
    parse(asset.search)
    return asset.search
  } catch (e) {
    const t = await searchNetworkAsset(asset.search)
    if (t.length === 0)
      throw new Error('资产未搜索到...请重新输入')
    return t[0].asset_id
  }
}


// -------- 二维码相关
const showTxCode = ref(false)
const tx = ref<TransactionInput>()
function showTxCodeModal(_tx: TransactionInput) {
  tx.value = _tx
  showTxCode.value = true
}

function closeTxCode() {
  showTxCode.value = false
}
</script>