import { BridgeAddress, CNBAssetID } from "@/assets/statistic";

export const testParams = {
  address: BridgeAddress,
  method_name: 'deposit',
  method_type: 'address,uint256',
  params: '0xbE48C98736E54c99d92f1616e90FC944Deb64030,10000'
}

export const testInput = {
  asset: CNBAssetID,
  amount: '0.0001',
  extra: '0096dc880ed035cfdd2f334874379bb6a128aca78847e7ef24000000000000000000000000be48c98736e54c99d92f1616e90fc944deb640300000000000000000000000000000000000000000000000000000000000002710',
}
