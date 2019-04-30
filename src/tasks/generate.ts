import { TaskInputs, TaskOutputs } from "mesg-js/lib/service"

export default (bitcoinClient: any) => async (inputs: TaskInputs, outputs: TaskOutputs): Promise<void> => {
  try {
    const generate = await bitcoinClient.generate(1)
    return outputs.success({ blockHash: generate[0] })
  }
  catch (error) {
    return outputs.error({ message: error.message })
  }
}
