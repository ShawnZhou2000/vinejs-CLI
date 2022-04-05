const { promisify } = require('util');
const download = promisify(require('download-git-repo'));
const ora = require('ora');
const log = require('../utils/colorLog');

async function gitClone(repo, name, desc) {
  if (!repo) {
    log.info('not selected')
    return;
  }
  const downloadProcess = ora(`download ${name} from ${repo}, please wait...\n`);
  downloadProcess.start();
  try {
    await download(repo, desc);
    downloadProcess.succeed(`download ${name} successfully.`);
  } catch (e) {
    log.error('git clone error, please check your git config.');
    log.error(e);
    console.log(e);
    downloadProcess.fail(`download error, process is terminated.`);
    log.help();
  }
}

module.exports = gitClone;