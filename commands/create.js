const handleCreate = (name, dir) => {
  const inquirer = require("inquirer");
  const log = require("../utils/colorLog");
  const coreList = require("../data/coreList");
  const deployerList = require("../data/deployerList");
  const gitClone = require("../utils/gitClone");
  const baseGit = require("../data/vineBaseGit");
  const path = require("path");
  const vineGitRepo = require("../data/vineGit");

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
  const targetDir = path.resolve(dir, name);
  log.info("Vine process will create a new project at " + targetDir);
  inquirer.prompt(promptList).then(async (ans) => {
    console.log(ans);
    let coreGit = vineGitRepo("core", ans.core);
    let deployerGit = vineGitRepo("deployer", ans.deployer);
    console.log(coreGit, deployerGit);
    const startTimeStamp = new Date();
    await gitClone(baseGit, "@vinejs/base", targetDir);
    await gitClone(coreGit, "@vinejs/core", targetDir + "/core");
    await gitClone(deployerGit, "@vinejs/deployer", targetDir + "/deployer");
    const endTimeStamp = new Date();
    const costTime = endTimeStamp - startTimeStamp;
    log.info(`Vine.js installed successfully in ${costTime / 1000}s.`);
    log.info(`try run 'vine debug' to preview your new website!`);
  });
};

module.exports = handleCreate;
