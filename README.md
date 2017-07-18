# service-generator

Yeoman generator for new services.

## Try it out
Install Yeoman:
```sh
npm i -g yo
```

Clone the repo, install, link and build:

```sh
git clone git@github.com:msinton/generator-node-service-bespoke.git && \
cd generator-node-service-bespoke && \
npm i && \
npm link && \
npm run build # or npm run watch
```

And then, inside of the directory of the new package you want to create:

```sh
yo node-service-bespoke
```
## Documents

There are several generated documents that describe best practices.

- [NEW-SERVICE.md](templates/app/NEW-SERVICE.md)
- [RELEASE-NOTES.md](templates/app/RELEASE-NOTES.tpl.md) (template)
- [README.md](templates/app/README.tpl.md) (template)

## Development

### Basics

The generation of the project is done in several steps. "Prompting" is the first step, where the user must select the project characteristics. Then the templates are generated during the "writing" step. At the "end" step, some commands are run to setup the project (e.g. install npm dependencies, copy githooks, etc). Some related source files are:

- Prompting: [available prompts](src/app/generator/prompting/prompts.js), [features texts](src/app/generator/prompting/options.js) and [followed flow](src/app/generator/prompting/flow.js)
- Template: Check out the files (the names don't always match) [app](templates/app) and the [writing of app](src/app/generator/writing.js)
- Tests: Take a look at the [tests](src/app/__tests__) to understand how the templates should work.

There is the option to try the generator inside the repo with: `npm run generate-example`, which will create the directory `example-project` which will not be tracked by git. You must have the generator previously linked.

### Patterns

- Use the `.tpl` name in files when it has conditional content, so it is copied with `this.fs.copyTpl`
- If you want to create a subgenerator, e.g. `yo node-service-bespoke:foo`, place the new generator within `src/foo/` ([more info](http://yeoman.io/authoring/))

### External links

- [Yeoman API](http://yeoman.io/generator/)
- [Inquirer Readme](https://github.com/SBoudrias/Inquirer.js/blob/master/README.md)
