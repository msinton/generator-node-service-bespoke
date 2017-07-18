import fs from "fs"

export function setupGit({log, runCmd}) {
  log("\nSetting up git ...\n")

  if (!fs.existsSync(".git")) { // eslint-disable-line no-sync
    log(runCmd("git init"))
  }
}
