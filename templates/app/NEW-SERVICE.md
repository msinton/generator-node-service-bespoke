
# Creating A New Service

Creating a new service? Great. Use this to help you get started.

## Starting a New Project

The first things you need to do are:

- scaffold your project with `service-generator` (good job!)
- push it to the desired

### Config

Best practices.

**Prefer flat config** (because etcd works better this way, or something).

**Use specific config names for individual use-cases.** Don't use config like `isDev`, instead prefer keys like `enableMonitoring`.

**Don't have any config in your service.** This means no config files. No default config. No environment-specific config. 

*All* config should be external, from whatever environment your service is running in.

**Use a schema.** This documents what config your service accepts. Your service should exit if the schema fails validation.

**Configure once at startup.** This means `require(config)` should only appear once in your service, in the top-level bootstrap file. Configuration for different parts of the app (db, api etc.) should be injected.

**Do not mutate config.** Even in tests. Config should be immutable. Once `config.get()` is called the object will be frozen anyway.

See [The 12-Factor App](http://12factor.net/config) for more info.

## Developing Your Service

### Ping test

Implement a `/ping-test` route. This should simply return `200`, or optionally a `5xx` if there is a connectivity issue with a backing service (e.g. the database).

### Monitoring

The following steps will be handled by the generator:

- Add a New Relic config file (`newrelic.js`) in the root of your project.

- Add the following to the top of your 'bootstrapping' script, before you initialise your server.

```js
if (enableMonitoring) {
  require("newrelic")
}
```

### Update this document

If you find anything out of date or any extra information during the process, update this document.
