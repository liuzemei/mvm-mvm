import axios from 'axios'
import { RegistryAddress } from '@/assets/statistic'
import { Payment, PaymentGenerateParams } from 'mixin-node-sdk'

export const ApiUploadParams = (key: string, raw: string) =>
  axios.post('https://mvm-api.test.mixinbots.com/', { key, raw, address: RegistryAddress })


export const ApiGetPayment = async (data: PaymentGenerateParams): Promise<Payment> => {
  const res = await axios.post(`https://mvm-api.test.mixinbots.com/payment`, data)
  return res.data
}