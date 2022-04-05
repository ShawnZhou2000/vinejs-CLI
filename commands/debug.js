const ora = require('ora');
const log = require('../utils/colorLog');
const chalk = require('chalk');
const Koa = require('koa');
const serve = require("koa-static");
const path = require('path').resolve(__dirname, '../draft');
const app = new Koa();
const ymlConfig = require('../data/getYMLConfig');


const handleDebug = (userPort) => {
  app.use(serve(path, { extensions:["html"] }));
  const port = userPort ? userPort : ymlConfig.devServer.debug.port;
  log.info(`start local debug server on ${port}, please wait a moment...`);
  const processServer = ora(`starting local server on port ${port}...`);
  app.listen(port);
  processServer.succeed('local server start successfully!')
  log.info(`vine server is running at ${chalk.underline('http://localhost:' + port)}, press ctrl+C to stop.`);
}

process.on('SIGINT', function() {
  // 监听ctrl + c
  log.bye();

  process.exit();
})

module.exports = handleDebug;