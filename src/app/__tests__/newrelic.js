import path from "path"
import assert from "yeoman-assert"
import helpers from "yeoman-test"

const GENERATOR_PATH = path.join(__dirname, "../index.js")

const FILE_NAME = "newrelic.js"

const PACKAGE_NAME = "foo-bar-baz"
const PACKAGE_DESCRIPTION = "bar"

const assertFileContains = text => assert.fileContent(FILE_NAME, text)

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

describe(FILE_NAME, function() {
  describe("no features", () => {
    beforeGenerateProjectWithFeatures([])

    it("does not create the file", () => {
      assert.noFile([FILE_NAME])
    })
  })

  describe("shouldUseNewRelic", () => {
    beforeGenerateProjectWithFeatures([], {
      shouldUseNewRelic: true,
    })

    it("creates the file", () => {
      assert.file([FILE_NAME])
    })

    it("has the name of the package", () => {
      assertFileContains(PACKAGE_NAME)
    })
  })

})
