/* eslint-disable max-nested-callbacks */

import path from "path"
import assert from "yeoman-assert"
import helpers from "yeoman-test"
import {forEach} from "ramda"

import {featuresMap, servicePackageList} from "../generator/prompting/options"

const GENERATOR_PATH = path.join(__dirname, "../index.js")

const FILE_NAME = "package.json"

const PACKAGE_NAME = "foo"
const PACKAGE_DESCRIPTION = "bar"

const TESTS_SCRIPTS = [`"test-coverage":`, `"test":`, `"test-watch":`]

const assertFileContains = text => assert.fileContent(FILE_NAME, text)
const assertFileDoesNotContain = text => assert.noFileContent(FILE_NAME, text)

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

function generateDefaultSpec() {
  it("creates file", () => {
    assert.file([FILE_NAME])
  })

  it("has the expected project description", () => {
    assert.jsonFileContent(FILE_NAME, {description: PACKAGE_DESCRIPTION})
  })

  it("contains the correct name", () => {
    assertFileContains(`"name": "${PACKAGE_NAME}"`)
  })

  it("contains private: false", () => {
    assertFileContains(`"private": false`)
  })

  it("has the config dependency", () => {
    assertFileContains(`"config": "^1.26.0"`)
  })
}

function generateExpectedScriptsSpec(scripts) {
  it("has the expected scripts", () => {
    forEach(assertFileContains, scripts)
  })
}

describe(FILE_NAME, function() {
  describe("no features", () => {
    beforeGenerateProjectWithFeatures([])

    generateDefaultSpec()

    it("contains the correct name", () => {
      assertFileContains(`"name": "foo"`)
    })
  })

  describe(`feature: "${featuresMap.TESTS}"`, () => {
    beforeGenerateProjectWithFeatures([featuresMap.TESTS])

    generateDefaultSpec()

    generateExpectedScriptsSpec(TESTS_SCRIPTS)

    it("contains the correct dependency", () => {
      assertFileContains(`"istanbul": "^0.4.0"`)
    })
  })

  describe(`feature: "${featuresMap.GIT}"`, () => {
    beforeGenerateProjectWithFeatures([featuresMap.GIT])

    generateDefaultSpec()
  })

  describe(`${servicePackageList.no}`, () => {
    beforeGenerateProjectWithFeatures([], {
      servicePingRoute: servicePackageList.no,
    })

    generateDefaultSpec()

    it("doesn't have extra dependencies", () => {
      assertFileDoesNotContain(`"express"`)
      assertFileDoesNotContain(`"newrelic"`)
    })
  })

  describe(`${servicePackageList.EXPRESS}`, () => {
    beforeGenerateProjectWithFeatures([], {
      servicePingRoute: servicePackageList.EXPRESS,
    })

    generateDefaultSpec()

    it("has extra dependencies", () => {
      assertFileContains(`"express": "^4.15.0"`)
    })
  })

  describe("shouldUseNewRelic", () => {
    beforeGenerateProjectWithFeatures([], {
      shouldUseNewRelic: true,
    })

    generateDefaultSpec()

    it("has extra dependencies", () => {
      assertFileContains(`"newrelic": "^1.40.0"`)
    })
  })

  describe(`feature: "${featuresMap.TESTS}"`, () => {
    beforeGenerateProjectWithFeatures([featuresMap.TESTS], {
    })

    generateDefaultSpec()

    it("contains the correct istanbul dev dependency", () => {
      assertFileContains(`"istanbul": "^0.4.0"`)
    })

    it("contains the jenkins reporter", () => {
      assertFileContains(`"mocha-jenkins-reporter"`)
    })

    it("contains the bamboo-test script", () => {
      assertFileContains(`"bamboo-test"`)
    })
  })
})
