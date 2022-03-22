<template>
  <n-modal v-model:show="showModal" :onClose="() => emit('close')">
    <n-card
      style="width: 600px"
      title="请使用 Mixin Messenger 扫码"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <canvas ref="codeRef" style="width:300px;height:300px" />
    </n-card>
  </n-modal>
</template>


<script setup lang="ts">
import { MixinClient } from '@/ethers/mixin';
import { TransactionInput } from 'mixin-node-sdk';
import { useLoadingBar, NModal, NCard } from 'naive-ui'
import { nextTick, onMounted, ref, watch } from 'vue'
import Qrious from 'qrious'
const loading = useLoadingBar()
const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  tx: {
    type: Object,
    default: () => ({}),
  }
})

const emit = defineEmits<{ (e: 'close'): void }>()


// -------- 二维码相关
const codeRef = ref(null)
// 获取转账二维码

watch(() => props.showModal, async (o, n) => {
  console.log(1232)
  console.log(o, n)
  if (o) {
    loading.start()
    const { code_id } = await MixinClient.verifyPayment(props.tx as TransactionInput)
    nextTick(() => new Qrious({
      element: codeRef.value,
      value: 'mixin://codes/' + code_id,
    }))
    loading.finish()
  }
})

onMounted(async () => {
  if (!props.tx.trace_id) return
  loading.start()
  const { code_id } = await MixinClient.verifyPayment(props.tx as TransactionInput)
  nextTick(() => new Qrious({
    element: codeRef.value,
    value: 'mixin://codes/' + code_id,
  }))
  loading.finish()
})


</script>