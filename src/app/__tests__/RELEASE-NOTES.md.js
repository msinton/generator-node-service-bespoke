import path from "path"
import assert from "yeoman-assert"
import helpers from "yeoman-test"

import {featuresMap} from "../generator/prompting/options"

const FILE_NAME = "RELEASE-NOTES.md"

const GENERATOR_PATH = path.join(__dirname, "../index.js")
const PACKAGE_NAME = "foo"
const PACKAGE_DESCRIPTION = "bar"

function beforeGenerateProjectWithFeatures(features) {
  before(() => helpers.run(GENERATOR_PATH)
    .withPrompts({
      packageName: PACKAGE_NAME,
      packageDescription: PACKAGE_DESCRIPTION,
      features,
    })
    .toPromise()
  )
}

describe(FILE_NAME, function() {
  describe("no features", () => {
    beforeGenerateProjectWithFeatures([])

    it("does not contain file", () => {
      assert.noFile([FILE_NAME])
    })
  })

  describe(`feature: "${featuresMap.RELEASE_NOTES}"`, () => {
    beforeGenerateProjectWithFeatures([featuresMap.RELEASE_NOTES])

    it("creates file", () => {
      assert.file([FILE_NAME])
    })

    it("contains the package name", () => {
      assert.fileContent(FILE_NAME, PACKAGE_NAME)
    })
  })

})
