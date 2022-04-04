// Reads balance of ether of wallet address

const { ethers } = require("ethers"); //ethers.js

const INFURA_ID = ""
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`) //connect to blockchain node using INFURA

const address = '' //wallet address

//async - await
const main = async () => {
  const balance = await provider.getBalance(address) //Returns the balance of address as of the blockTag block height
  console.log(`\nETH Balance of ${address} --> ${ethers.utils.formatEther(balance)} ETH\n`)

  const transaction = await provider.getTransactionCount(address) //Returns the number of transactions address has ever sent
  console.log(`\nTransactionCount of ${address} --> ${transaction}`)

  const block = await provider.getBlockNumber() //Returns the block number (or height) of the most recently mined block
  console.log(`Block Number: ${block}`)
}

main()
