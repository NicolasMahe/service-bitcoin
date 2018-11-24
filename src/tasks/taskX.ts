import { TaskInputs, TaskOutputs } from "mesg-js/lib/service"

const taskX = (inputs: TaskInputs, outputs: TaskOutputs): Promise<void> => {
  if (inputs.foo === "hello" && inputs.bar === "world") {
    return outputs.success({ x: "Hello world is valid" })
  }
  return outputs.error({ message: "invalid inputs" })
}
export { taskX }