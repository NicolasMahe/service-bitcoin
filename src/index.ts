import { service as MESG } from "mesg-js"
import { newBlockEventEmitter } from "./newBlock"
import transactionEvent from "./events/transaction"
import send from "./tasks/send"
import initDev from "./tasks/initDev"
import generate from "./tasks/generate"
const BitcoinCore = require('bitcoin-core')

const network = process.env.NETWORK
const rpcUsername = process.env.RPC_USERNAME
const rpcPassword = process.env.RPC_PASSWORD
const rpcPort = parseInt(<string>process.env.RPC_PORT, 10)
const blockConfirmations = parseInt(<string>process.env.BLOCK_CONFIRMATIONS, 10)
const pollingTime = parseInt(<string>process.env.POLLING_TIME, 10)

const main = async () => {
  const mesg = MESG()

  const bitcoinClient = new BitcoinCore({
    network: network,
    host: 'bitcoincore',
    username: rpcUsername,
    password: rpcPassword,
    port: rpcPort
  });
  
  mesg.listenTask({
    send: send(bitcoinClient),
    initDev: initDev(bitcoinClient),
    generate: generate(bitcoinClient),
  })
  .on('error', error => console.error('catch listenTask', error))

  const newBlock = await newBlockEventEmitter(bitcoinClient, blockConfirmations, null, pollingTime)
  newBlock.on('newBlock', blockHeader => {
    try {
      console.error('new block', blockHeader.blockNumber)

      // TODO:
      // blockEvent(mesg, web3, blockNumber)
      // .catch(error => console.error('catch block event', error))

      transactionEvent(mesg, bitcoinClient, blockHeader)
      .catch(error => console.error('catch transactionEvent', error))
    }
    catch (error) {
      console.error('catch newBlock on', error)
    }
  })
}

try {
  main()
  .catch(error => console.error('catch promise', error))
} catch (error) {
  console.error('catch try', error)
}
