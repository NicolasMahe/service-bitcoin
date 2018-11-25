import { service as MESG } from "mesg-js"
import config from "../config.json"
import { newBlockEventEmitter } from "./newBlock"
import Service from "mesg-js/lib/service"
import { EmitEventReply } from "mesg-js/lib/client/service-client"
import transactionEvent from "./events/transaction"
import send from "./tasks/send"
import initDev from "./tasks/initDev"
const BitcoinCore = require('bitcoin-core')
// import * as BitcoinCore from "bitcoin-core"

const main = async () => {
  const mesg = MESG()
  // HACK FOR TESTING
  // let mesg = {} as Service
  // mesg.emitEvent = async (event: string, data: any) => {
  //   console.log(event, data)
  //   return {} as EmitEventReply
  // }
  // END HACK FOR TESTING

  const bitcoinClient = new BitcoinCore({
    network: config.network,
    // wallet: 'wallet1.dat',
    host: 'bitcoincore',
    username: config.rpcUsername,
    password: config.rpcPassword,
    port: config.rpcPort
  });
  
  mesg.listenTask({
    send: send(bitcoinClient),
    initDev: initDev(bitcoinClient),
  })
  .on('error', error => console.error('catch listenTask', error))

  const newBlock = await newBlockEventEmitter(bitcoinClient, config.blockConfirmations, 0, config.pollingTime)
  newBlock.on('newBlock', blockHeader => {
    try {
      console.error('new block', blockHeader.blockNumber)

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
