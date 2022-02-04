const handleCreate = (name, dir) => {
  const inquirer = require('inquirer');
  const log = require('../utils/colorLog');
  const coreList = require('../data/coreList');
  const deployerList = require('../data/deployerList');
  const gitClone = require('../utils/gitClone');
  const baseGit = require('../data/vineBaseGit');
  const path = require('path');

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
  const targetDir = path.resolve(dir, name);
  log.info("Vine process will create a new project at " + targetDir);
  inquirer.prompt(promptList)
    .then(async ans => {
      console.log(ans);
      await gitClone(baseGit, '@vinejs/base', targetDir);
    })
};

module.exports = handleCreate;