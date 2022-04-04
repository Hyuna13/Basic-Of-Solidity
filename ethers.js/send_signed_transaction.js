//Send ether and Fetch transaction
const { ethers } = require("ethers");

const INFURA_ID = "1202069f51604d2290e3072860f24904"
const provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${INFURA_ID}`) //rinkeby 테스트넷 연결

const account1 = "" //sender
const account2 = "" //recipient

const privateKey1 = "" //sender private key
const wallet = new ethers.Wallet(privateKey1, provider)

const main = async () => {
    //Show account1 balance before transfer
    const senderBeforeBalance = await provider.getBalance(account1)
    //Show account2 balance before transfer
    const receiverBeforeBalance = await provider.getBalance(account2)

    console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBeforeBalance)}`)
    console.log(`Receiver balance before: ${ethers.utils.formatEther(receiverBeforeBalance)}\n`)
  
    //Send Ether
    const tx = await wallet.sendTransaction({
      to: account2,
      value: ethers.utils.parseEther("0.345")
    })//Submits transaction to the network to be mined

    //Wait for transaction to be mined
    await tx.wait()
    console.log(tx)

    //Show account1 balance after transfer
    const senderAfterBalance = await provider.getBalance(account1)
    //Show account2 balance after transfer
    const receiverAfterBalance = await provider.getBalance(account2)

    console.log(`\nSender balance after: ${ethers.utils.formatEther(senderAfterBalance)}`)
    console.log(`Receiver balance after: ${ethers.utils.formatEther(receiverAfterBalance)}\n`)
}

main()
