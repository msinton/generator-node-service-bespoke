import path from "path"
import assert from "yeoman-assert"
import helpers from "yeoman-test"

const FILE_NAME = ".gitignore"

const GENERATOR_PATH = path.join(__dirname, "../index.js")
const PACKAGE_NAME = "foo"
const PACKAGE_DESCRIPTION = "bar"

function beforeGenerateProjectWithFeatures(features, extra) {
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

function generateDefaultSpecs() {
  it("creates file", () => {
    assert.file([FILE_NAME])
  })
}

describe(FILE_NAME, function() {
  describe("no features", () => {
    beforeGenerateProjectWithFeatures([])

    generateDefaultSpecs()

    it("contains test-reports", () => {
      assert.fileContent(FILE_NAME, "/test-reports")
    })
  })
})
