import {compose, invoker, partialRight} from "ramda"
import {execSync} from "child_process"

export const runCmd = compose(
  invoker(0, "toString"),
  execSync
)

export const runCmdAndPipeToStdout = partialRight(execSync, [{stdio: [0, 1, 2]}])
