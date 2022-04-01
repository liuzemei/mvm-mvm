import { ChainId, Currency, CurrencyAmount, ETHER, JSBI, Pair, Percent, Token, TokenAmount, Trade, WETH } from 'quorum-uniswap-sdk'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { getMvmContract } from '@/services/ethers'
import { BigNumber } from 'bignumber.js'
import { Erc20ABI, RegistryAddress, TokenList } from '@/assets/statistic'
import { MixinClient } from '@/services/mixin'
import { getContractByUserIDs } from 'mixin-node-sdk'

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

const fixedNumber = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))
export const getExactOut = async (addrA: string, addrB: string, amountA: string): Promise<string> => {
  const [tokenA, tokenB, pair] = await getPair(addrA, addrB)
  if (!pair) return ""
  amountA = new BigNumber(amountA).times(1e8).toString()
  const paredAmount = new TokenAmount(tokenA, JSBI.BigInt(amountA))
  const trade = Trade.bestTradeExactIn([pair], paredAmount, tokenB, { maxHops: 3, maxNumResults: 1 })[0]
  return trade.minimumAmountOut(fixedNumber).toExact()
}

export const getPoolBalance = async (mixinID: string, addrA: string, addrB: string): Promise<string | string[]> => {
  const u = await MixinClient.readUser(mixinID)
  if (!u || !u.user_id) return "用户不存在"
  const userAddr = await getContractByUserIDs(u.user_id, undefined, RegistryAddress)
  const [tokenA, tokenB, pair] = await getPair(addrA, addrB)
  if (!pair) return "交易对不存在"
  const erc20Contract = await getErc20Contract(pair.liquidityToken.address!)
  const userBalance = await erc20Contract.balanceOf(userAddr)
  const userPoolBalance = new TokenAmount(pair.liquidityToken!, JSBI.BigInt(userBalance.toString()))
  const pairContract = await getPairContract(tokenA, tokenB)
  const res = await pairContract.totalSupply()
  const totalPoolTokens = new TokenAmount(pair.liquidityToken, res.toString())
  const token0Deposited = pair.getLiquidityValue(tokenA, totalPoolTokens, userPoolBalance, false)
  const token1Deposited = pair.getLiquidityValue(tokenB, totalPoolTokens, userPoolBalance, false)
  return [pair.liquidityToken.address, userPoolBalance.toSignificant(4), token0Deposited?.toSignificant(6), token1Deposited?.toSignificant(6)]
}


const getPair = async (addrA: string, addrB: string): Promise<[Token, Token, Pair?]> => {
  const tokens = await getAllTokens()
  const tokenA = tokens[addrA]
  const tokenB = tokens[addrB]
  const contract = await getPairContract(tokenA, tokenB)
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
  const tokens: any[] = TokenList
  const result: { [address: string]: Token } = {}
  tokens.forEach((t: Token) => {
    result[t.address] = new Token(t.chainId, t.address, t.decimals, t.symbol, t.name)
  })
  return result
}

const getPairContract = (tokenA: Token, tokenB: Token) => {
  const pairAddress = Pair.getAddress(tokenA, tokenB)
  return getMvmContract(pairAddress, IUniswapV2PairABI)
}

export const getErc20Contract = (addr: string) => getMvmContract(addr, Erc20ABI)