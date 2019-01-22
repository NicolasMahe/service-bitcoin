import { BlockHeader } from "../newBlock/interface";
import Service from "mesg-js/lib/service/service";

export = async (mesg: Service, bitcoinClient: any, blockHeader: BlockHeader) => {
  const block = await bitcoinClient.getBlock(blockHeader.blockHash, 2)
  block.tx.forEach(async (tx: any) => {
    tx.vout.forEach(async (vout: any) => {
      try {
        let addresses = vout.scriptPubKey.addresses
        if (addresses !== undefined) {
          if (!Array.isArray(addresses)) {
            addresses = [addresses]
          }
          addresses.forEach(async (address: any) => {
            try {
              await mesg.emitEvent('transaction', {
                to: address,
                value: vout.value.toString(),
                transactionHash: tx.hash,
                blockHash: block.hash,
                blockNumber: block.height,
              })
            }
            catch (error) {
              console.error('catch transactions address', error)
            }
          })
        }
      }
      catch (error) {
        console.error('catch transactions', error)
      }
    })
  })
}
