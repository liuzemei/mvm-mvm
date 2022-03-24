import { ChainId, Currency, CurrencyAmount, ETHER, JSBI, Pair, Percent, Price, Token, TokenAmount, Trade, WETH } from 'quorum-uniswap-sdk'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { getContract } from '@/ethers'
import { BigNumber } from 'bignumber.js'

export const wrappedCurrency = (currency: Currency | undefined, chainId: ChainId | undefined): Token | undefined =>
  chainId && currency === ETHER ? WETH[chainId] : currency instanceof Token ? currency : undefined

// const PAIR_INTERFACE = new Interface(IUniswapV2PairABI)


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
  const res = await fetch(`https://metamask.test.mixinbots.com/quorum.json`)
  const tokens: Token[] = (await res.json()).tokens
  const result: { [address: string]: Token } = {}
  tokens.filter((t: Token) => t.chainId === 83927).forEach((t: Token) => {
    result[t.address] = new Token(t.chainId, t.address, t.decimals, t.symbol, t.name)
  })
  return result
}