const { promisify } = require('util');
const download = promisify(require('download-git-repo'));
const ora = require('ora');
const log = require('../utils/colorLog');

async function gitClone(repo, name, desc) {
  const downloadProcess = ora(`download ${name} from ${repo}, please wait...`);
  downloadProcess.start();
  const startTimeStamp = new Date();
  await download(repo, desc);
  downloadProcess.succeed();
  const endTimeStamp = new Date();
  const costTime = endTimeStamp - startTimeStamp;
  log.info(`install ${name} successfully in ${costTime}s.`);
}

module.exports = gitClone;