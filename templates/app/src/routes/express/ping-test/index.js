module.exports = function pingTest(app) {
  app.get("/ping-test", (req, res) => res.sendStatus(200))
}

