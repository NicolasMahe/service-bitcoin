import { service } from "mesg-js"
import { taskX } from "./tasks/taskX"

// const MESG = service()

// MESG.listenTask({
//   taskX: taskX
// })

// MESG.emitEvent("started", { x: true })


const Socket = require('blockchain.info').Socket

const mySocket = new Socket()
mySocket.onOpen(_ => {
  console.log('on open')
})
mySocket.onClose((data: any) => {
  console.log('on close', data)
  process.exit(1)
})
// mySocket.onTransaction((tx: any) => {
  // console.log('tx', tx)
  // console.log('on tx', {
  //   index: tx.tx_index,
  //   hash: tx.hash,
  // })
  // tx.out.forEach((out: any) => {
  //   console.log('out', {
  //     addr: out.addr,
  //     value: out.value,
  //   })
  // })
// }, ) // {addresses: [], setTxMini: bool }
mySocket.onBlock((block: any) => {
  console.log('on block', block)
  process.exit(1)
})
