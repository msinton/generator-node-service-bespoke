exports.config = {
  "app_name": ["<%= packageName %>"],
  logging: {
    level: "info",
    filepath: "stdout",
  },
  rules: {
    ignore: [
      "^\/ping-test",
    ],
  },
  "error_collector": {
    enabled: true,
    "ignore_status_codes": [],
    "capture_events": true,
    "max_event_samples_stored": 100,
  },
}
