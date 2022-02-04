const handleCreate = (name, dir) => {
  const inquirer = require('inquirer');
  const log = require('../utils/colorLog');
  const coreList = require('../data/coreList');
  const deployerList = require('../data/deployerList');
  const gitClone = require('../utils/gitClone');

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

  log.info("project name: " + name);
  log.info("process will create a new project at " + dir);
  inquirer.prompt(promptList)
    .then(async ans => {
      console.log(ans);
      // let str = __dirname.split('\\');
      // str.pop();
      // str.push('draft');
      // str = str.join('\\');
      // await gitClone(baseGit, '@vinejs/base', str);
    })
};

module.exports = handleCreate;