import { TaskInputs, TaskOutputs } from "mesg-js/lib/service"

export default (bitcoinClient: any) => async (inputs: TaskInputs, outputs: TaskOutputs): Promise<void> => {
  try {
    await bitcoinClient.importPrivKey(inputs.privateKey)
    const txHash = await bitcoinClient.sendToAddress(inputs.to, inputs.value)
    return outputs.success({ transactionHash: txHash })
  }
  catch (error) {
    return outputs.error({ message: error.message })
  }
}
