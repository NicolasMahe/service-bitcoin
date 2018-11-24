import { EventEmitter } from "events"
import { NewBlockEventEmitterInterface } from "./interface"

export = async (bitcoinClient: any, blockConfirmations: number, initialBlockNumber: number, pollingTime: number): Promise<NewBlockEventEmitterInterface> => {
  const newBlock: NewBlockEventEmitterInterface = new EventEmitter()
  let previousBlockNumber: number = initialBlockNumber
  const pollingBlockNumber = async () => {
    try {
      const lastBlockNumber = await bitcoinClient.getBlockCount()
      const blockNumber = lastBlockNumber - blockConfirmations
      if (blockNumber > previousBlockNumber) {
        previousBlockNumber = blockNumber
        const blockHash = await bitcoinClient.getBlockHash(lastBlockNumber)
        newBlock.emit('newBlock', {
          blockNumber,
          blockHash
        })
      }
    } catch (error) {
      console.error("catch polling", error)
    }
    return setTimeout(async () => {
      try {
        await pollingBlockNumber()
      } catch (error) {
        console.error("catch polling timeout", error)
      }
    }, pollingTime)
  }
  await pollingBlockNumber()
  return newBlock
}
