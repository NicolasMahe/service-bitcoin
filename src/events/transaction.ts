import Service from "mesg-js/lib/service"
import { BlockHeader } from "../newBlock/interface";

export = async (mesg: Service, networkID: Number, blockHeader: BlockHeader) => {
  const blockExplorer = require('blockchain.info').blockExplorer.usingNetwork(networkID)
  const block = await blockExplorer.getBlock(blockHeader.blockHash)
  block.tx.forEach(async (transaction: any) => {
    transaction.out.forEach(async (out: any) => {
      try {
        if (out.addr !== undefined) {
          await mesg.emitEvent('transaction', {
            to: out.addr,
            value: out.value.toString(),
            transactionHash: transaction.hash,
            blockHash: blockHeader.blockHash,
            blockNumber: blockHeader.blockNumber,
          })          
        }
      }
      catch (error) {
        console.error('catch transactions', error)
      }
    })
  })
}
