export interface ABI {
  type: string
  inputs: any[]
  outputs: any[]
  name: string
  stateMutability: string
}

export interface Uniswap {
  address: string
  chainId: number
  decimals: number
  logoURI: string
  name: string
  symbol: string

  label?: string
  value?: string
}