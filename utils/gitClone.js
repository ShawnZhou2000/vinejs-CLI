const { promisify } = require('util');
const download = promisify(require('download-git-repo'));
const ora = require('ora');
const log = require('../utils/colorLog');

async function gitClone(repo, name, desc) {
  const downloadProcess = ora(`download ${name} from ${repo}, please wait...\n`);
  downloadProcess.start();
  const startTimeStamp = new Date();
  try {
    await download(repo, desc);
    downloadProcess.succeed(`download ${name} successfully.`);
    const endTimeStamp = new Date();
    const costTime = endTimeStamp - startTimeStamp;
    log.info(`Vine.js installed successfully in ${costTime / 1000}s.`);
    log.info(`try run 'vine debug' to preview your new website!`);
  } catch (e) {
    log.error('git clone error, please check your git config.');
    log.error(e);
    console.log(e);
    downloadProcess.fail(`download error, process is terminated.`);
    log.help();
  }
}

module.exports = gitClone;