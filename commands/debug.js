const ora = require('ora');
const log = require('../utils/colorLog');
const chalk = require('chalk');

const handleDebug = (userPort) => {
  log.info('start local debug, please wait a moment...');
  const processDebug = ora('building project for local server...');
  processDebug.start();
  setTimeout(() => {
    let port = 7890;
    if (userPort) {
      port = userPort;
    }
    processDebug.succeed(`building success, ready to start server on port ${port}`);
    const processServer = ora('starting local server...');
    processServer.start();
    setTimeout(() => {
      processServer.succeed('local server start successfully!')
      log.info(`vine server is running at ${chalk.underline('http://localhost:' + port)}, press ctrl+C to stop.`);
    }, 3000);
  }, 5000); 
}

module.exports = handleDebug;