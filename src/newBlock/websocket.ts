import { EventEmitter } from "events"
import { NewBlockEventEmitterInterface } from "./interface"

export = async (client: any, blockConfirmations: number, initialBlockNumber: number): Promise<NewBlockEventEmitterInterface> => {
  const newBlock: NewBlockEventEmitterInterface = new EventEmitter()
  let previousBlockNumber: number = initialBlockNumber
  const blockCount = await client.getBlockCount()
  console.log('blockCount', blockCount)
  // socket.onBlock((block: any) => {
  //   console.log('block', block)
  //   const blockNumber = block.height - blockConfirmations
  //   if (blockNumber > previousBlockNumber) {
  //     previousBlockNumber = blockNumber
  //     newBlock.emit('newBlock', {
  //       blockNumber: blockNumber,
  //       blockHash: block.hash
  //     })
  //   }
  // })
  // socket.onClose((data: any) => {
  //   console.error('newBlockHeaders listener closed', data)
  //   newBlock.emit('error', data)
  // })
  // socket.on('error', (error: Error) => {
  //   console.error('error on newBlockHeaders listener', error)
  //   newBlock.emit('error', error)
  // })
  return newBlock
}
