import path from "path"
import helpers from "yeoman-test"

import {createsFile, doesntCreateFile} from "../../../test/helpers"

import {featuresMap, servicePackageList} from "../generator/prompting/options"

const GENERATOR_PATH = path.join(__dirname, "../index.js")
const PACKAGE_NAME = "foo"
const PACKAGE_DESCRIPTION = "bar"

function beforeGenerateProjectWithFeatures(features, extra = {}) {
  before(() => helpers.run(GENERATOR_PATH)
    .withPrompts({
      packageName: PACKAGE_NAME,
      packageDescription: PACKAGE_DESCRIPTION,
      features,
      ...extra,
    })
    .toPromise()
  )
}

function checkCommonSpecs() {
  createsFile(".eslintignore")
  createsFile("resources/githooks/pre-push")
  createsFile("resources/githooks/pre-commit")
  createsFile("LICENSE")
}

describe("Static files", function() {
  describe("no features", () => {
    beforeGenerateProjectWithFeatures([])

    checkCommonSpecs()

    createsFile("NEW-SERVICE.md")
    doesntCreateFile("config/default.json")
    doesntCreateFile("src/routes/index.js")
    doesntCreateFile("src/routes/ping-test/index.js")
    doesntCreateFile("src/routes/version/index.js")
  })

  describe(`feature: "${featuresMap.TESTS}"`, () => {
    beforeGenerateProjectWithFeatures([featuresMap.TESTS])

    checkCommonSpecs()

    createsFile("test/mocha.opts")
  })

  describe("no ping-test route", () => {
    beforeGenerateProjectWithFeatures([], {
      servicePingRoute: servicePackageList.no,
    })

    checkCommonSpecs()

    createsFile("NEW-SERVICE.md")

    doesntCreateFile("src/routes/index.js")
    doesntCreateFile("src/routes/ping-test/index.js")
    doesntCreateFile("src/routes/version/index.js")
  })

  describe("express route", () => {
    beforeGenerateProjectWithFeatures([], {
      servicePingRoute: servicePackageList.EXPRESS,
    })

    checkCommonSpecs()

    createsFile("NEW-SERVICE.md")

    createsFile("src/routes/index.js")
    createsFile("src/routes/ping-test/index.js")
    createsFile("src/routes/version/index.js")
  })

})
