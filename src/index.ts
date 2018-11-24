import { service as MESG } from "mesg-js"
import config from "../config.json"
import { newBlockEventEmitterWS } from "./newBlock"
import Service from "mesg-js/lib/service"
import { EmitEventReply } from "mesg-js/lib/client/service-client"
import transactionEvent from "./events/transaction"

const main = async () => {
  const mesg = MESG()
  // HACK FOR TESTING
  // let mesg = {} as Service
  // mesg.emitEvent = async (event: string, data: any) => {
  //   console.log(event, data)
  //   return {} as EmitEventReply
  // }
  // END HACK FOR TESTING
  
  // mesg.listenTask({
  //   decodeLog: decodeLog(web3),
  //   executeSmartContractMethod: executeSmartContractMethod(web3, config.defaultGasLimit),
  //   callSmartContractMethod: callSmartContractMethod(web3)
  // })
  // .on('error', error => console.error('catch listenTask', error))

  const newBlock = await newBlockEventEmitterWS(config.networkID, config.blockConfirmations, 0)
  newBlock.on('newBlock', blockHeader => {
    try {
      console.error('new block', blockHeader.blockNumber)

      // blockEvent(mesg, web3, blockNumber)
      // .catch(error => console.error('catch block event', error))

      transactionEvent(mesg, config.networkID, blockHeader)
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
