import {always, curry, merge} from "ramda"

import {displayCurrentPropsFormatted} from "./helpers"

const exitIfNecessary = curry(({log}, {shouldContinue}) => {
  if (shouldContinue === false) {
    log("Exiting ...")
    process.exit()
  }
})

const checkIfShouldContinue = curry(({log, availablePrompts, prompt}, props) => {
  displayCurrentPropsFormatted({log}, props)

  return prompt([availablePrompts.shouldContinuePrompt])
    .then(exitIfNecessary({log}))
    .then(always(props))
})

const displayDependencyPrompts = curry(({prompt, availablePrompts}, props) =>
  prompt([
    availablePrompts.servicePackagePrompt,
    availablePrompts.shouldUseNewRelicPrompt,
  ]).then(merge(props))
)

export function flow({prompt, log}, availablePrompts) {
  return prompt([
    availablePrompts.packageNamePrompt,
    availablePrompts.packageDescriptionPrompt,
    availablePrompts.gitUrlPrompt,
  ])
  .then((props) => prompt([availablePrompts.createFeaturesPrompt(props)]).then(merge(props)))
  .then(displayDependencyPrompts({prompt, availablePrompts}))
  .then(checkIfShouldContinue({log, prompt, availablePrompts}))
}
