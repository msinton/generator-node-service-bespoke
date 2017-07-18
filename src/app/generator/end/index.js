import {runCmd, runCmdAndPipeToStdout} from "../helpers"
import {hasFeatureKeyInFeatures} from "../prompting/helpers"

import {summaryMessage} from "./summary-message"
import {updateDependencies} from "./update-dependencies"
import {setupGit} from "./setup-git"
import {readNewServiceDocsMessage} from "./read-new-service-docs"

export function end() {
  const log = this.log.bind(this)
  const {features} = this.props
  const hasFeature = hasFeatureKeyInFeatures(features)

  if (hasFeature("NPM_DEPS")) {
    updateDependencies({log, runCmdAndPipeToStdout})
  }

  if (hasFeature("GIT")) {
    setupGit({log, runCmd, features})
  }

  summaryMessage({log, runCmd})

  readNewServiceDocsMessage({log})
}
