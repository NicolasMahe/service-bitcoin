import { TaskInputs, TaskOutputs } from "mesg-js/lib/service"

export default (bitcoinClient: any) => async (inputs: TaskInputs, outputs: TaskOutputs): Promise<void> => {
  try {
    const generate = await bitcoinClient.generate(101)
    const unspentTx = await bitcoinClient.listUnspent()
    if (unspentTx.lenght == 0) {
      throw new Error ('no unspent transaction')
    }
    const address = unspentTx[0].address
    const privateKey = await bitcoinClient.dumpPrivKey(address)
    return outputs.success({ address, privateKey })
  }
  catch (error) {
    return outputs.error({ message: error.message })
  }
}
