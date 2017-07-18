const config = require("config")

const enableMonitoring = config.get("enableMonitoring")

<% if (shouldUseNewRelic) { %>
if (enableMonitoring) {
  require("newrelic")
}
<% } %>


module.exports.main = function main() {
  return true
}
