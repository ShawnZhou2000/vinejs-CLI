const ora = require('ora');
const log = require('../utils/colorLog');
const chalk = require('chalk');
const Koa = require('koa');
const serve = require("koa-static");
const path = require('path').resolve(process.cwd(), 'dist');
const app = new Koa();
const ymlConfig = require('../data/getYMLConfig')(__dirname, '../vine_data.yml', 'devServer');
const handleBuild = require('./build.js');
const packageData = require('../utils/packageData');


const handleDebug = async (userPort) => {
  const ascii = `
  _    __ _            
 | |  / /(_)____   ___ 
 | | / // // __ \\ / _ \\
 | |/ // // / / //  __/
 |___//_//_/ /_/ \\___/   Vine.js v${packageData.version}              
 `
  console.log(chalk.green(ascii));
  // build project before debug
  await handleBuild(() => {
    app.use(serve(path, { extensions:["html"] }));
    const port = userPort ? userPort : ymlConfig[0].port;
    log.info(`🛠️ ready to start local debug server on ${port}, please wait a moment...`);
    const processServer = ora(`starting local server on port ${port}...`);
    try {
      app.on('error', (e) => {
        console.log(e);
      })
      app.listen(port);
    } catch (e) {
      // TODO: fix this server port bug
      processServer.fail(`😭 Vine.js local server failed to start on port ${port}`);
      log.error('Please check your configuration, and then try again.');
      log.info(`Tips: Please check whether port ${port} is in use or not.`);
      process.exit(1);
    }
    processServer.succeed('😎 Vine.js local server start successfully!')
    log.info(`vine server is running at ${chalk.underline('http://localhost:' + port)}, press ctrl+C to stop.`);
  });
}

module.exports = handleDebug;