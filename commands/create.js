const handleCreate = async (name, dir) => {
  const inquirer = require("inquirer");
  const log = require("../utils/colorLog");
  const coreList = require("../data/coreList");
  const deployerList = require("../data/deployerList");
  const gitClone = require("../utils/gitClone");
  const baseGit = require("../data/vineBaseGit");
  const path = require("path");
  const vineGitRepo = require("../data/vineGit");
  const cmd = require('node-cmd');
  const ora = require('ora');

  const promptList = [
    {
      type: "list",
      name: "core",
      message: "choose a core: ",
      choices: coreList,
    },
    {
      type: "list",
      name: "deployer",
      message: "choose a deployer: ",
      choices: deployerList,
    },
  ];
  // get target path and print path
  const targetDir = path.resolve(dir, name);
  log.info("Vine process will create a new project at " + targetDir);
  
  // download core and deployer by Git
  inquirer.prompt(promptList).then(async (ans) => {
    // console.log(ans);
    let coreGit = vineGitRepo("core", ans.core);
    let deployerGit = vineGitRepo("deployer", ans.deployer);
    // calculate summary install time by date stamp
    const startTimeStamp = new Date();

    // step 1. clone repo
    await gitClone(baseGit, "@vinejs/base", targetDir);
    await gitClone(coreGit, "@vinejs/core", targetDir + "/core");
    await gitClone(deployerGit, "@vinejs/deployer", targetDir + "/deployer");

    // step 2. npm install
    const npmInstallProcess = ora(`Vine.js core installing, please wait...\n`);
    npmInstallProcess.start();
    await cmd.run(`cd ${targetDir}/core && npm install`, function(err, data, stderr) {
      if (err) {
        npmInstallProcess.error(`failed to install Vine.js core.\n`);
        log.error(stderr);
      } else {
        npmInstallProcess.succeed(`Vine.js core successfully installed.\n`);
        log.info(data);
        const endTimeStamp = new Date();
        const costTime = endTimeStamp - startTimeStamp;
        log.info(`Vine.js installed successfully in ${costTime / 1000}s.`);
        log.info(`try run 'cd ${name} && vine debug' to preview your new website!`);
      }
    });
  });
};

module.exports = handleCreate;
