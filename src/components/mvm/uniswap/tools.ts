import { ChainId, Currency, CurrencyAmount, ETHER, JSBI, Pair, Percent, Price, Token, TokenAmount, Trade, WETH } from 'quorum-uniswap-sdk'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { getContract } from '@/services/ethers'
import { BigNumber } from 'bignumber.js'

export const wrappedCurrency = (currency: Currency | undefined, chainId: ChainId | undefined): Token | undefined =>
  chainId && currency === ETHER ? WETH[chainId] : currency instanceof Token ? currency : undefined

export const wrappedCurrencyAmount = (
  currencyAmount: CurrencyAmount | undefined,
  chainId: ChainId | undefined
): TokenAmount | undefined => {
  const token = currencyAmount && chainId ? wrappedCurrency(currencyAmount.currency, chainId) : undefined
  return token && currencyAmount ? new TokenAmount(token, currencyAmount.raw) : undefined
}

export const unwrappedToken = (token: Token): Currency =>
  token.equals(WETH[token.chainId]) ? ETHER : token



let allTokens: { [key: string]: Token }

export const getAllTokens = async (): Promise<{ [key: string]: Token }> => {
  if (!allTokens) allTokens = await fetchQuorumJson()
  return allTokens
}

export const getRateByAddress = async (addrA: string, addrB: string): Promise<number> => {
  const [tokenA, tokenB, pair] = await getPair(addrA, addrB)
  if (!pair) return 0
  return Number(pair.priceOf(tokenA).toFixed(18))
}

export const getExactOut = async (addrA: string, addrB: string, amountA: string): Promise<string> => {
  const [tokenA, tokenB, pair] = await getPair(addrA, addrB)
  if (!pair) return ""
  amountA = new BigNumber(amountA).times(1e8).toString()
  const paredAmount = new TokenAmount(tokenA, JSBI.BigInt(amountA))
  const t = Trade.bestTradeExactIn([pair], paredAmount, tokenB, { maxHops: 3, maxNumResults: 1 })[0]
  return t.minimumAmountOut(fixedNumber).toExact()
}
const fixedNumber = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))


const getPair = async (addrA: string, addrB: string): Promise<[Token, Token, Pair?]> => {
  const tokens = await getAllTokens()
  const tokenA = tokens[addrA]
  const tokenB = tokens[addrB]
  const pairAddresses = Pair.getAddress(tokenA, tokenB)
  const contract = await getContract(pairAddresses, IUniswapV2PairABI)
  try {
    const { reserve0, reserve1 } = await contract.getReserves()
    const notReversed = tokenA.sortsBefore(tokenB)
    const [token0, token1] = notReversed ? [tokenA, tokenB] : [tokenB, tokenA]
    const pair = new Pair(new TokenAmount(token0, reserve0.toString()), new TokenAmount(token1, reserve1.toString()))
    return [tokenA, tokenB, pair]
  } catch (e) {
    return [tokenA, tokenB]
  }
}

const fetchQuorumJson = async (): Promise<{ [address: string]: Token }> => {
  // const res = await fetch(`https://metamask.test.mixinbots.com/quorum.json`)
  const tokens: any[] = [{
    "chainId": 83927,
    "address": "0xd76CD15Db55b59586b9007Ce73aea8D681aecdd4",
    "asset_id": "965e5c6e-434c-3fa9-b780-c50f43cd955c",
    "name": "Chui Niu Bi",
    "symbol": "CNB",
    "decimals": 8,
    "logoURI": "https://mixin-images.zeromesh.net/0sQY63dDMkWTURkJVjowWY6Le4ICjAFuu3ANVyZA4uI3UdkbuOT5fjJUT82ArNYmZvVcxDXyNjxoOv0TAYbQTNKS=s128"
  },
  {
    "chainId": 83927,
    "address": "0x5bF947315dCFB12b9c803F336Cc983A00f2bc95B",
    "asset_id": "66152c0b-3355-38ef-9ec5-cae97e29472a",
    "name": "NXCoin",
    "symbol": "NXC",
    "decimals": 8,
    "logoURI": "https://images.mixin.one/yH_I5b0GiV2zDmvrXRyr3bK5xusjfy5q7FX3lw3mM2Ryx4Dfuj6Xcw8SHNRnDKm7ZVE3_LvpKlLdcLrlFQUBhds=s128"
  },
  {
    "chainId": 83927,
    "address": "0x159E849f74AACd42813AC0822e6639F22C659e02",
    "asset_id": "c6d0c728-2624-429b-8e0d-d9d19b6592fa",
    "name": "Bitcoin",
    "symbol": "BTC",
    "decimals": 8,
    "logoURI": "https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128"
  },
  {
    "chainId": 83927,
    "address": "0xc44878Ff981BAe8d13770326Da5F3ddB0a5C686a",
    "asset_id": "6cfe566e-4aad-470b-8c9a-2fd35b49c68d",
    "name": "EOS",
    "symbol": "EOS",
    "decimals": 8,
    "logoURI": "https://mixin-images.zeromesh.net/OTwqLjEwc6v0JutJc-1sYkh_juFOvVbFz26WvvwfLGdKq6ZtwAT-wKhX0k-5PsgOK_Pd9rCQjZfwMJmiNXCBzpHnjapBtkCqAVCTCg=s128"
  },
  {
    "chainId": 83927,
    "address": "0x9623008Aa7eb30AdcEb0c75708BAbB6f7f1063e3",
    "asset_id": "f5ef6b5d-cc5a-3d90-b2c0-a2fd386e7a3c",
    "name": "BOX Token",
    "symbol": "BOX",
    "decimals": 8,
    "logoURI": "https://mixin-images.zeromesh.net/ml7tg1ZGrQt6IJSvEusWFfthosOB98GWN7r4EkmgSP8tbJHxK7OWki9zfZFFDCDOJE0nlLBR6dc4nbUguXE3Bg4=s128"
  },
  {
    "chainId": 83927,
    "address": "0x6C5bf3eCE931C3d5A0F646A515551C4fe1593A26",
    "asset_id": "c94ac88f-4671-3976-b60a-09064f1811e8",
    "name": "Mixin",
    "symbol": "XIN",
    "decimals": 8,
    "logoURI": "https://mixin-images.zeromesh.net/UasWtBZO0TZyLTLCFQjvE_UYekjC7eHCuT_9_52ZpzmCC-X-NPioVegng7Hfx0XmIUavZgz5UL-HIgPCBECc-Ws=s128"
  },
  {
    "chainId": 83927,
    "address": "0xe2BBB24Cd1B55B78088EbB8CC598Ed0b3416246D",
    "asset_id": "43d61dcd-e413-450d-80b8-101d5e903357",
    "name": "Ether",
    "symbol": "ETH",
    "decimals": 8,
    "logoURI": "https://mixin-images.zeromesh.net/zVDjOxNTQvVsA8h2B4ZVxuHoCF3DJszufYKWpd9duXUSbSapoZadC7_13cnWBqg0EmwmRcKGbJaUpA8wFfpgZA=s128"
  },
  {
    "chainId": 83927,
    "address": "0xB470D5afA83ebafe697D9dC9BAbA3273D62292De",
    "asset_id": "eea900a8-b327-488c-8d8d-1428702fe240",
    "name": "MobileCoin",
    "symbol": "MOB",
    "decimals": 8,
    "logoURI": "https://mixin-images.zeromesh.net/eckqDQi50ZUCoye5mR7y6BvlbXX6CBzkP89BfGNNH6TMNuyXYcCUd7knuIDpV_0W7nT1q3Oo9ooVnMDGjl8-oiENuA5UVREheUu2=s128"
  },
  {
    "chainId": 83927,
    "address": "0xC40fa1ebd59dDF51E4747fBCbbD32AfC0A06A631",
    "asset_id": "4d8c508b-91c5-375b-92b0-ee702ed2dac5",
    "name": "Tether USD",
    "symbol": "USDT",
    "decimals": 8,
    "logoURI": "https://mixin-images.zeromesh.net/ndNBEpObYs7450U08oAOMnSEPzN66SL8Mh-f2pPWBDeWaKbXTPUIdrZph7yj8Z93Rl8uZ16m7Qjz-E-9JFKSsJ-F=s128"
  },
  {
    "chainId": 83927,
    "address": "0x8bf49b0D721edF49A5d48da63e81Cc215a381460",
    "asset_id": "31d2ea9c-95eb-3355-b65b-ba096853bc18",
    "name": "Pando USD",
    "symbol": "pUSD",
    "decimals": 8,
    "logoURI": "https://mixin-images.zeromesh.net/cH4GWuPXbzeZl6OOunpn7BxE25n3v8URwnNszs0FpZqv3OTlxP1zpzKw89VKTpBwWL-Ned1R36mmy1C4GMuPX1rL-PjfEJ2zby9V=s128"
  },
  {
    "chainId": 83927,
    "address": "0x9c4eF7Ad22abdfdA68921DCeeF517bF257Fb3338",
    "asset_id": "4f2ec12c-22f4-3a9e-b757-c84b6415ea8f",
    "name": "Quorum Token",
    "symbol": "RUM",
    "decimals": 8,
    "logoURI": "https://mixin-images.zeromesh.net/e_y4q9JIdP1PZbwmwO_6v-fx7_ZyifODuYtHvLQDrkLNwH3pQTDVY0EHZA394gjZawwyt3vPC7NlMvyT2nEuPypeDioV_OMd6T8=s128"
  },
  ]
  const result: { [address: string]: Token } = {}
  tokens.forEach((t: Token) => {
    result[t.address] = new Token(t.chainId, t.address, t.decimals, t.symbol, t.name)
  })
  return result
}