const inquirer = require('inquirer');
const log = require('../utils/colorLog');
const coreList = require('../data/coreList');
const deployerList = require('../data/deployerList');
const repoList = require('../data/repoList');
const gitClone = require('../utils/gitClone');
console.log(coreList);

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
    .then(async ans => {
      console.log(ans);
      let str = __dirname.split('\\');
      str.pop();
      str.push('draft');
      str = str.join('\\');
      await gitClone(repoList.base, '@vinejs/base', str);
    })
};

module.exports = handleCreate;