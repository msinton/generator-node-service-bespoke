import {validateFeature} from "./helpers"
import {featuresMap, servicePackageList} from "./options"
import path from "path"

const generateFeatureCheckbox = (featureName, extra) => {
  validateFeature(featureName)

  return {name: featuresMap[featureName], ...extra}
}

const currentDirName = process.cwd()
  .split(path.sep)
  .pop()

const packageNamePrompt = {
  type: "input",
  name: "packageName",
  message: "What is the package name?",
  default: currentDirName,
}

const packageDescriptionPrompt = {
  type: "input",
  name: "packageDescription",
  message: "Describe what, how and why the package solves",
}

const createFeaturesPrompt = () => ({
  type: "checkbox",
  name: "features",
  message: "List of features",
  choices: [
    generateFeatureCheckbox("TESTS", {checked: true}),
    generateFeatureCheckbox("NPM_DEPS", {checked: false}),
    generateFeatureCheckbox("GIT", {checked: true}),
    generateFeatureCheckbox("RELEASE_NOTES", {checked: false}),
  ],
})

const servicePackagePrompt = {
  type: "list",
  name: "servicePackage",
  message: "Which package do you want to use?",
  choices: [
    servicePackageList.EXPRESS,
    servicePackageList.RESTIFY,
  ],
}

const shouldUseNewRelicPrompt = {
  type: "confirm",
  name: "shouldUseNewRelic",
  message: "Do you want to use New Relic with your service?",
  default: false,
}

const shouldContinuePrompt = {
  type: "confirm",
  name: "shouldContinue",
  message: "These are your selected values, do you want to continue?",
  default: true,
}

const gitUrlPrompt = {
  type: "input",
  name: "gitUrl",
  message: "What is the git url? e.g. github.com:msinton",
  default: "github.com:msinton",
}

export const prompts = {
  servicePackagePrompt,
  createFeaturesPrompt,
  packageDescriptionPrompt,
  packageNamePrompt,
  shouldContinuePrompt,
  shouldUseNewRelicPrompt,
  gitUrlPrompt,
}
