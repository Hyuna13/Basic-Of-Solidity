//Read smart contracts
const { ethers } = require("ethers");

const INFURA_ID = "" 
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const ERC20_ABI = [
  "function name() view returns (string)", //argument X
  "function symbol() view returns (string)", //argument X
  "function version() view returns (string)", //argument X
  "function totalSupply() view returns (uint256)", //argument X
  "function balanceOf(address) view returns(uint)", //argument O
] 

const address = "" //contract address
const contract = new ethers.Contract(address, ERC20_ABI, provider) //Creating a new instance of a Contract connects to an existing contract 

const main = async () => {
  const name = await contract.name()
  const symbol = await contract.symbol()
  const version = await contract.version()
  const totalSupply = await contract.totalSupply()
  const balance = await contract.balanceOf(address)
  
  console.log(`\nReading from ${address}\n`)
  console.log(`Name: ${name}`)
  console.log(`Symbol: ${symbol}`)
  console.log(`Version: ${version}`)
  console.log(`Total Supply: ${totalSupply}`)
  console.log(`Total Supply: ${ethers.utils.formatEther(totalSupply)}`)
  console.log(`Balance Returned: ${balance}`)
  console.log(`Balance Returned: ${ethers.utils.formatEther(balance)}\n`)
}

main()
