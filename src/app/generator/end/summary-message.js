import {bold, underline} from "chalk"
import {compose} from "ramda"

const removeBeginningOfPath = str => str.replace(/^\.\//, "")
const addPadding = str => `   ${str}`

function getCreatedFilesList(runCmd) {
  return runCmd(`find . -type f -not -path "*/node_modules/*" -not -path "*/.git/*"`)
    .split("\n")
    .sort()
    .map(removeBeginningOfPath)
    .map(addPadding)
    .join("\n")
}

const highlight = compose(underline, bold)

export function summaryMessage({log, runCmd}) {
  log(`\nThe project generation has ${highlight("finished correctly")}.`)
  log("The final files, with some exclusions, are:")

  compose(log, getCreatedFilesList)(runCmd)
}
