const inquirer = require('inquirer');
const log = require('../utils/colorLog');
const coreList = require('../data/coreList');
const deployerList = require('../data/deployerList');
const repoList = require('../data/repoList');

const promptList = [
  {
    type: 'list',
    name: 'core',
    message: 'choose a core: ',
    choices: coreList
  },
  {
    type: 'list',
    name: 'deployer',
    message: 'choose a deployer: ',
    choices: deployerList
  }
];

const handleCreate = (name) => {
  log.info("project name: " + name);
  inquirer.prompt(promptList)
    .then(ans => {
      console.log(ans);
      console.log(repoList);
    })
};

module.exports = handleCreate;