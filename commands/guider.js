const ora = require('ora');
const log = require('../utils/colorLog');
const Koa = require('koa');
const serve = require("koa-static");
const path = require('path').resolve(__dirname, '../guider');
const app = new Koa();
const chalk = require('chalk');

const handleGuider = (userPort) => {
  app.use(serve(path, { extensions:["html"] }));
  const port = userPort ? userPort : '3000';
  log.info(`🛠️ ready to start guider server on ${port}, please wait a moment...`);
  const processServer = ora(`starting guider on port ${port}...`);
  try {
    app.on('error', (e) => {
      console.log(e);
    })
    app.listen(port);
  } catch (e) {
    processServer.fail(`😭 Vine.js guider failed to start on port ${port}`);
    log.error('Please check your configuration, and then try again.');
    log.info(`Tips: Please check whether port ${port} is in use or not.`);
    process.exit(1);
  }
  processServer.succeed('😎 Vine.js guider start successfully!')
  log.info(`vine server is running at ${chalk.underline('http://localhost:' + port)}, press ctrl+C to stop.`);
}

module.exports = handleGuider;