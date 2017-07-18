export function updateDependencies({log, runCmdAndPipeToStdout}) {
  log("\nUpdating and installing npm modules ...\n")

  runCmdAndPipeToStdout("npm update")
}
