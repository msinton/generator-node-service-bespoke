import path from "path"
import assert from "yeoman-assert"
import helpers from "yeoman-test"

import {featuresMap} from "../../../generator/prompting/options"

const FILE_NAME = "src/__tests__/index.js"

const GENERATOR_PATH = path.join(__dirname, "../../../index.js")
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

function generateDefaultSpecs() {
  it("creates file", () => {
    assert.file([FILE_NAME])
  })
}

describe(FILE_NAME, function() {
  describe("no features", () => {
    beforeGenerateProjectWithFeatures([])

    it("does not create the file", () => {
      assert.noFile(FILE_NAME)
    })
  })

  describe(`feature: "${featuresMap.TESTS}"`, () => {
    beforeGenerateProjectWithFeatures([featuresMap.TESTS])

    generateDefaultSpecs()

    it("uses require", () => {
      assert.fileContent(FILE_NAME, "require(")
    })

    it("does not use import", () => {
      assert.noFileContent(FILE_NAME, "import ")
    })
  })

})
