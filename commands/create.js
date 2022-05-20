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
  const fs = require('fs');

  const runner = (command) => {
    return new Promise((resolve, reject) => {
      cmd.run(command, function(err, data, stderr) {
        if (err) {
          reject(stderr);
        } else {
          resolve(data);
        }
      })
    })
  }

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
  log.logo();

  // get target path and print path
  const targetDir = path.resolve(dir, name);
  log.info("Vine process will create a new project at " + targetDir);
  
  // download core and deployer by Git
  inquirer.prompt(promptList).then(async (ans) => {
    let coreGit = vineGitRepo("core", ans.core);
    let deployerGit = vineGitRepo("deployer", ans.deployer);
    // calculate summary install time by date stamp
    let startTimeStamp = new Date();

    // step 1. clone repo
    await gitClone(baseGit, "Vine.js base environment", targetDir);
    await gitClone(coreGit.gitUrl, `Vine.js ${coreGit.name}`, targetDir + "/core");
    // await gitClone(deployerGit.gitUrl, "@vinejs/deployer", targetDir + "/deployer");
    try {
      fs.writeFileSync(`vine.deployer.yml`,
      `# This is an empty deployer configuration file\n# You can copy config template from https://vinejs.tech/deployer`);
      fs.renameSync(`vine.deployer.yml`, `./${name}/vine.deployer.yml`);
    } catch (err) {
      log.error(`Failed to create vine.deployer.yml, please check your config.`);
      log.error(err);
      process.exit(1);
    }
    

    // step 2. npm install(base)
    // step 3. npm install(core)
    // step 3. npm install(deployer)
    const npmInstallProcess_Base = ora(`Vine.js base environment installing, please wait...\n`);
    const npmInstallProcess_Core = ora(`Vine.js core installing, please wait...\n`);
    const npmInstallProcess_Deployer = ora(`Vine.js deployer installing, please wait...\n`);

    npmInstallProcess_Base.start();
    runner(`cd ${targetDir}/base && npm install`)
    .then(res => {
      npmInstallProcess_Base.succeed(`Vine.js base environment successfully installed.\n`);
      log.info(res);
      const endTimeStamp = new Date();
      const costTime = endTimeStamp - startTimeStamp;
      log.info(`Vine.js base installed successfully in ${costTime / 1000}s.`);
    })
    .catch(err => {
      npmInstallProcess_Core.error(`failed to install Vine.js base.\n`);
      log.error(err);
      process.exit(1);
    })
    .then(() => {
      startTimeStamp = new Date();
      npmInstallProcess_Core.start();
      return runner(`cd ${targetDir}/core && npm install`);
    })
    .then(res => {
      npmInstallProcess_Core.succeed(`Vine.js core successfully installed.\n`);
      log.info(res);
      const endTimeStamp = new Date();
      const costTime = endTimeStamp - startTimeStamp;
      log.info(`Vine.js core installed successfully in ${costTime / 1000}s.`);
    })
    .catch(err => {
      npmInstallProcess_Core.error(`failed to install Vine.js core.\n`);
      log.error(err);
      process.exit(1);
    })
    .then(() => {
      startTimeStamp = new Date();
      npmInstallProcess_Deployer.start();
      return runner(`cd "${name}/base" && npm install ${deployerGit.npmName}`);
    })
    .then(res => {
      npmInstallProcess_Deployer.succeed(`Vine.js deployer successfully installed.\n`);
      log.info(res);
      const endTimeStamp = new Date();
      const costTime = endTimeStamp - startTimeStamp;
      log.info(`Vine.js deployer installed successfully in ${costTime / 1000}s.\n`);
      log.title(`Install Finished`);
      log.info(`Well done, Vine.js completely installed. ✈️`);
      log.info(`try run 'cd ${name} && vine debug' to preview your new website!`);
    })
    .catch(err => {
      npmInstallProcess_Deployer.error(`failed to install Vine.js deployer.\n`);
      log.error(err);
      process.exit(1);
    });
  });
};

module.exports = handleCreate;
