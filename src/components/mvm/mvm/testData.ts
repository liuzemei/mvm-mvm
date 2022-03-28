import { BridgeAddress, CNBAssetID } from "@/assets/statistic";

export const testParams = {
  address: BridgeAddress,
  method_name: 'deposit',
  method_type: 'address,uint256',
  params: '0x1476A50AdC1A232ca52694DC6AA86CF2f3087b86,10000'
}

export const testInput = {
  asset: CNBAssetID,
  amount: '0.0001',
  extra: '96dc880ed035cfdd2f334874379bb6a128aca78847e7ef240000000000000000000000001476a50adc1a232ca52694dc6aa86cf2f3087b860000000000000000000000000000000000000000000000000000000000002710',
}
