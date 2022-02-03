const ymlConfig = require('../data/getYMLConfig');
const deployerList = ymlConfig('', './vine_data.yml', 'deployer');
const coreList = ymlConfig('', './vine_data.yml', 'core');
const chalk = require('chalk');
const log = require('../utils/colorLog');

const handleList = (opts) => {
  log.title('Available Core List');
  coreList.forEach(item => {
    log.dbLine(item.name, item.description);
  });
  log.info(`not satisfied? find more amazing at ${chalk.underline('https://ext.vinejs.tech/core')}.\n`);
  log.title('Available Deployer List');
  deployerList.forEach(item => {
    log.dbLine(item.name, item.description);
  });
  log.info(`need other deployer? see ${chalk.underline('https://ext.vinejs.tech/deployer')} for more support.`);
}

module.exports = handleList;