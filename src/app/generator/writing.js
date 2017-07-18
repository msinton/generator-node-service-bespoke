import {merge} from "ramda"

import {hasFeatureKeyInFeatures, isServicePackageKey} from "./prompting/helpers"
import {servicePackageList} from "./prompting/options"

function formatJSONFileUnbound(filePath) {
  const fileContent = this.fs.readJSON(filePath)

  this.fs.writeJSON(filePath, fileContent)
}

function removeLinesWithOnlySpacesFromFileUnbound(filePath) {
  const fileContent = this.fs.read(filePath)
  const newFileContent = fileContent.replace(/^[ ]+?$\s/gm, "")

  this.fs.write(filePath, newFileContent)
}

/* eslint-disable complexity */

export function writing() {
  const hasFeature = hasFeatureKeyInFeatures(this.props.features)
  const isServicePackage = isServicePackageKey(this.props.servicePackage)
  const templatesMap = merge(this.props, {hasFeature, servicePackageList, isServicePackage})

  const formatJSONFile = formatJSONFileUnbound.bind(this)
  const removeLinesWithOnlySpacesFromFile = removeLinesWithOnlySpacesFromFileUnbound.bind(this)

  this.fs.copyTpl(this.templatePath("package.tpl.json"), this.destinationPath("package.json"), templatesMap)
  formatJSONFile(this.destinationPath("package.json"))

  this.fs.copy(this.templatePath("resources/githooks/pre-push"), this.destinationPath("resources/githooks/pre-push"))
  this.fs.copy(this.templatePath("resources/githooks/pre-commit"), this.destinationPath("resources/githooks/pre-commit"))

  this.fs.copyTpl(this.templatePath("gitignore.tpl"), this.destinationPath(".gitignore"), templatesMap)
  removeLinesWithOnlySpacesFromFile(".gitignore")

  this.fs.copy(this.templatePath("eslintignore"), this.destinationPath(".eslintignore"))

  this.fs.copyTpl(this.templatePath("README.tpl.md"), this.destinationPath("README.md"), templatesMap)
  this.fs.copy(this.templatePath("LICENSE"), this.destinationPath("LICENSE"))

  this.fs.copyTpl(this.templatePath("src/index.tpl.js"), this.destinationPath("src/index.js"), templatesMap)

  this.fs.copyTpl(this.templatePath("eslintrc.tpl.yml"), this.destinationPath(".eslintrc.yml"), templatesMap)

  if (hasFeature("TESTS")) {
    this.fs.copyTpl(this.templatePath("src/__tests__/index.tpl.js"), this.destinationPath("src/__tests__/index.js"), templatesMap)
    removeLinesWithOnlySpacesFromFile("src/__tests__/index.js")
    this.fs.copyTpl(this.templatePath("test/mocha.tpl.opts"), this.destinationPath("test/mocha.opts"), templatesMap)
    removeLinesWithOnlySpacesFromFile("test/mocha.opts")
  }

  this.fs.copy(this.templatePath("NEW-SERVICE.md"), this.destinationPath("NEW-SERVICE.md"))

  if (isServicePackage(servicePackageList.EXPRESS)) {
    this.fs.copyTpl(this.templatePath("src/index-server.tpl.js"), this.destinationPath("src/index.js"), templatesMap)
    this.fs.copy(this.templatePath("src/routes/express/ping-test/index.js"), this.destinationPath("src/routes/ping-test/index.js"))
    this.fs.copy(this.templatePath("src/routes/express/version/index.js"), this.destinationPath("src/routes/version/index.js"))
    this.fs.copy(this.templatePath("src/routes/index.js"), this.destinationPath("src/routes/index.js"))
  }

  if (isServicePackage(servicePackageList.RESTIFY)) {
    this.fs.copyTpl(this.templatePath("src/index-server.tpl.js"), this.destinationPath("src/index.js"), templatesMap)
    this.fs.copy(this.templatePath("src/routes/restify/ping-test/index.js"), this.destinationPath("src/routes/ping-test/index.js"))
    this.fs.copy(this.templatePath("src/routes/restify/version/index.js"), this.destinationPath("src/routes/version/index.js"))
    this.fs.copy(this.templatePath("src/routes/index.js"), this.destinationPath("src/routes/index.js"))
  }

  if (this.props.shouldUseNewRelic) {
    this.fs.copyTpl(this.templatePath("newrelic.tpl.js"), this.destinationPath("newrelic.js"), templatesMap)
  }

  removeLinesWithOnlySpacesFromFile("src/index.js")

  if (hasFeature("RELEASE_NOTES")) {
    this.fs.copyTpl(this.templatePath("RELEASE-NOTES.tpl.md"), this.destinationPath("RELEASE-NOTES.md"), templatesMap)
  }
}

/* eslint-enable complexity */
