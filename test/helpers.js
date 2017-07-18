import assert from "yeoman-assert"

export function createsFile(fileName) {
  it(`creates ${fileName}`, () => {
    assert.file([fileName])
  })
}

export function doesntCreateFile(fileName) {
  it(`doesn't create ${fileName}`, () => {
    assert.noFile([fileName])
  })
}
