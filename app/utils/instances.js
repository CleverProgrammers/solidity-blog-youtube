import postAbi from './Post.json'
import factoryAbi from './BlogFactory.json'

const contractAddress = '0x5C61734441fe9F06Ffc7BE970D4a766B79bFcF85'

const blogInstance = (web3Instance, address) => {
  return new web3Instance.eth.Contract(postAbi.abi, address)
}

const factoryInstance = web3Instance => {
  return new web3Instance.eth.Contract(factoryAbi.abi, contractAddress)
}

export { blogInstance, factoryInstance }
