import {curry, compose, contains, partialRight, replace} from "ramda"

import {featuresMap} from "./options"

const formatCurrentPropsDisplay = compose(
  replace(/"/g, ""),
  replace(/",/g, `"`),
  replace(/\n[ ]+\]/, ""),
  replace("[", ""),
  replace("\n}", ""),
  replace("{\n", ""),
  partialRight(JSON.stringify, [null, 4])
)

export function displayCurrentPropsFormatted({log}, props) {
  log("\n")
  log(formatCurrentPropsDisplay(props))
  log("\n")
}

export function validateFeature(featureKey) {
  if (!featuresMap[featureKey]) {
    throw new Error(`The feature ${featureKey} does not exist`)
  }
}

export const hasFeatureKeyInFeatures = curry((features, featureKey) => {
  validateFeature(featureKey)
  return contains(featuresMap[featureKey], features)
})

export const isServicePackageKey = (servicePackage) => (key) => servicePackage === key

