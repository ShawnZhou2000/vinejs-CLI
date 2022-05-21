#!/usr/bin/env node
const log = require('./utils/colorLog');
const packageData = require('./utils/packageData');
const chalk = require('chalk');
const semver = require('semver');

function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted, { includePrerelease: true })) {
    log.error(`You are using Node ${process.version}, but this version of ${id} requires Node ${wanted}.`);
    log.error(`Please upgrade your Node version.`);
    process.exit(1);
  } else {
    log.info(`Node.js ${process.version} detected`);
  }
}

function checkGit() {
  const cmd = require('node-cmd');
  let ans = cmd.runSync(`git --version`);
  if (ans.err) {
    log.error(`It seems you haven't install Git, Vine.js can't work without Git.`);
    log.error(`Please install Git correctly.`);
    process.exit(1);
  } else {
    // TODO: show Git version correctly.
  }
}

process.title = "Vine.js";
let indexFlag = true;
const commandIndex = ['create', 'debug', 'publish', 'guider', 'list', 'build', 'help', 'base'];
process.argv.forEach(item => {
  if (commandIndex.includes(item)) {
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
  checkGit();
  checkNodeVersion(packageData.engines.node, 'Vine.js');
}


const { program } = require('commander');
const handleCreate = require('./commands/create');
const handleDebug = require('./commands/debug');
const handlePublish = require('./commands/publish');
const handleGuider = require('./commands/guider');
const handleList = require('./commands/list');
const handleBuild = require('./commands/build');
const handleBase = require('./commands/base');

program
  .command('list')
  .description('list all available core and deployer')
  .action(() => {
    handleList( __dirname);
  })

program
  .command('create <name> [workspace] [core] [deployer]')
  .description('create a new vine project')
  .action((name, workspace, core, deployer) => {
    handleCreate(name, process.cwd(), workspace, core, deployer);
  });

program
  .command('build')
  .description('build static pages to dist folder')
  .action(() => {
    handleBuild();
  });

program
  .command('debug [port]')
  .description('start a local server to debug your vine project')
  .action((port) => {
    handleDebug(port);
  });

program
  .command('publish')
  .description('build a static site and upload to your server by using vine-deployer')
  .action(() => {
    handlePublish(program.opts());
  });

program
  .command('guider [port]')
  .description('launch a guider user interface to manage your vine project')
  .action((userPort) => {
    handleGuider(userPort);
  });

program
  .command('base')
  .description(`${chalk.redBright('ONLY IN DEBUG MODE.')} enable Vine.js base uni-backend service.`)
  .action(() => {
    handleBase(program.opts());
  });

program.parse(process.argv);

process.on('SIGINT', function() {
  // 监听ctrl + c
  log.bye();

  process.exit();
})