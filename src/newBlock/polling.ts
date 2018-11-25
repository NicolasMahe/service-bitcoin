import { EventEmitter } from "events"
import { NewBlockEventEmitterInterface } from "./interface"

export = async (bitcoinClient: any, blockConfirmations: number, initialBlockNumber: number | null, pollingTime: number): Promise<NewBlockEventEmitterInterface> => {
  const newBlock: NewBlockEventEmitterInterface = new EventEmitter()
  let previousBlockNumber = initialBlockNumber
  const pollingBlockNumber = async () => {
    try {
      const latestBlockNumber = await bitcoinClient.getBlockCount()
      const lastBlockNumber = latestBlockNumber - blockConfirmations
      if (previousBlockNumber === null) {
        previousBlockNumber = lastBlockNumber
      }
      for (let blockNumber = previousBlockNumber + 1; blockNumber <= lastBlockNumber; blockNumber++) {
        const blockHash = await bitcoinClient.getBlockHash(blockNumber)
        newBlock.emit('newBlock', {
          blockNumber,
          blockHash
        })
        previousBlockNumber = blockNumber
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
