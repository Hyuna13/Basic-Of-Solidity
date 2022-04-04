//Writing contracts
const { ethers } = require("ethers")

const INFURA_ID = ""
const provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${INFURA_ID}`)

const account1 = "" //sender
const account2 = "" //recipient

const privateKey1 = "" //sender private key
const wallet = new ethers.Wallet(privateKey1, provider)

const ERC20_ABI = [
  "function balanceOf(address) view returns(uint)", //argument O
  "function transfer(address to, uint amount) returns (bool)" //argument O
] 

const address= "" //contract address
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const balance = await contract.balanceOf(account1)

    console.log(`\nReading from ${address}\n`)
    console.log(`Balance of sender: ${balance}`)
    const contractWithWallet = contract.connect(wallet) //connect wallet to contract

    const tx = await contractWithWallet.transfer(account2, balance)
    await tx.wait()

    console.log(tx)

    const BalanceOfSender = await contract.balanceOf(account1)
    const ReceiverOfSender = await contract.balanceOf(account2)

    console.log(`\nBalance of sender: ${BalanceOfSender}`)
    console.log(`Balance of receiver: ${ReceiverOfSender}\n`)
}

main()
