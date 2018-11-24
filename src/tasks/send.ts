import { TaskInputs, TaskOutputs } from "mesg-js/lib/service"

export default (bitcoinClient: any) => async (inputs: TaskInputs, outputs: TaskOutputs): Promise<void> => {
  try {
    // const signedTx = await bitcoinClient.signMessageWithPrivKey(privateKey, message)
    // const signedTx = await bitcoinClient.signRawTransaction(Transaction, privateKey, message)

    await bitcoinClient.importPrivKey(inputs.privateKey)
    const txID = await bitcoinClient.sendToAddress(inputs.to, inputs.value)
    console.log('txID', txID)
    
    return await outputs.success({ transactionHash: txID })
  }
  catch (error) {
    return await outputs.error({ message: error.toString() })
  }
}
