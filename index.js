#!/usr/bin/env node

const { program } = require('commander');
const handleCreate = require('./commands/create');
const handleDebug = require('./commands/debug');
const handlePublish = require('./commands/publish');
const handleGuider = require('./commands/guider');
const handleList = require('./commands/list');
const log = require('./utils/colorLog');
const packageData = require('./utils/packageData');
const chalk = require('chalk');


process.title = "Vine.js";
let indexFlag = true;
process.argv.forEach(item => {
  if (
    item === 'create' ||
    item === 'debug' || 
    item === 'publish' || 
    item === 'guider' || 
    item === 'list'
    ) {
    indexFlag = false;
  }
})

if (indexFlag) {
  log.info(`Vine.js framework, version ${packageData.version}`);
  log.info(`To create a demo project, command 'vine create projectName'.`);
  log.info(`Get more information, see ${chalk.underline('https://vinejs.tech/')} .`);
  if (packageData.stage) {
    log.warn(`You are using a DEBUG version of Vine, which can be unstable.`)
  }
}

program
  .command('list [option]')
  .description('list all available core and deployer')
  .option('-c, --core', 'only show core list')
  .option('-d, --deployer', 'only show deployer list')
  .action(() => {
    handleList(program.opts());
  })

program
  .command('create <name>')
  .description('create a new vine project')
  .action((name) => {
    handleCreate(name);
  });

program
  .command('debug [port]')
  .description('start a local server to debug your vine project')
  .action((port) => {
    handleDebug(port);
  });

program
  .command('publish [options]')
  .description('build a static site and upload to your server by use vine-deployer')
  .option('-b, --build', `don't upload, only build static site`)
  .action(() => {
    handlePublish(program.opts());
  });

program
  .command('guider [port]')
  .description('launch a guider user interface to manage your vine project')
  .action((userPort) => {
    handleGuider(userPort);
  });

program.parse(process.argv);