const {version} = require("../../../../package.json")

module.exports = function getVersion(app) {
  app.get("/version", (req, res) => res.send(version))
}

