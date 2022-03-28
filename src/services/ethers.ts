import { BigNumberish, ethers, utils } from 'ethers'
import Web3Modal from "web3modal"
export const formatEth = async (v: BigNumberish) =>
  utils.formatEther(v)

export const getSigner = async () => {
  const web3Modal = new Web3Modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  return provider.getSigner()
}

export const getContract = async (addr: string, abi: any) => {
  const signer = await getSigner()
  return new ethers.Contract(addr, abi, signer)
}

export const signMessage = async (msg: string) => {
  const _msg = utils.arrayify(msg)
  const signer = await getSigner()
  return signer.signMessage(_msg)
}
