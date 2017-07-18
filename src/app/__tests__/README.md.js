import path from "path"
import assert from "yeoman-assert"
import helpers from "yeoman-test"

const FILE_NAME = "README.md"

const assertFileContains = text => assert.fileContent(FILE_NAME, text)

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

function generateDefaultSpecs() {
  it("creates file", () => {
    assert.file([FILE_NAME])
  })

  it("contains the project name", () => {
    assert.fileContent(FILE_NAME, `# ${PACKAGE_NAME}`)
  })

  it("contains the project description", () => {
    assert.fileContent(FILE_NAME, `${PACKAGE_DESCRIPTION}`)
  })
}

describe(FILE_NAME, function() {
  describe("no features", () => {
    beforeGenerateProjectWithFeatures([])
    generateDefaultSpecs()

    it("contains the correct authors url", () => {
      assertFileContains("https://github.com/msinton")
    })
  })

})
