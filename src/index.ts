import { service as MESG } from "mesg-js"
import config from "../config.json"
import { newBlockEventEmitter } from "./newBlock"
import transactionEvent from "./events/transaction"
import send from "./tasks/send"
import initDev from "./tasks/initDev"
import generate from "./tasks/generate"
const BitcoinCore = require('bitcoin-core')

const main = async () => {
  const mesg = MESG()

  const bitcoinClient = new BitcoinCore({
    network: config.network,
    host: 'bitcoincore',
    username: config.rpcUsername,
    password: config.rpcPassword,
    port: config.rpcPort
  });
  
  mesg.listenTask({
    send: send(bitcoinClient),
    initDev: initDev(bitcoinClient),
    generate: generate(bitcoinClient),
  })
  .on('error', error => console.error('catch listenTask', error))

  const newBlock = await newBlockEventEmitter(bitcoinClient, config.blockConfirmations, null, config.pollingTime)
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
