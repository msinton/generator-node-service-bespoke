<% if (isServicePackage("express")) { %>const express = require("express")<% }%><% if (isServicePackage("restify")) { %>const restify = require("restify")<% } %>

const config = require("config")
const {version, pingTest} = require("./routes")

<% if (isServicePackage("express")) { %>const app = express()<% } %><% if (isServicePackage("restify")) { %>const app = restify.createServer({})<% } %>
const PORT = config.get("port")

pingTest(app)
version(app)

app.listen(PORT, () => console.log(`app started on port: ${PORT}`))
