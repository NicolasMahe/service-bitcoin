import { EventEmitter } from "events"

export interface BlockHeader {
  blockNumber: Number
  blockHash: String
}

export interface NewBlockEventEmitterInterface extends EventEmitter {
  on(event: 'newBlock', listener: (blockHeader: BlockHeader) => void): this
  on(event: 'error', listener: (error: Error) => void): this
  
  emit(event: 'newBlock', blockHeader: BlockHeader): boolean
  emit(event: 'error', error: Error): boolean
}