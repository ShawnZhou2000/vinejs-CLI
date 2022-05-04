const log = require("../utils/colorLog");
const cmd = require('node-cmd');
const ora = require('ora');
const fs = require('fs');
const path = require('path');
const yamlParser = require('../utils/yamlParser');

const handleBuild = async (callback) => {
  const corePath = path.resolve(process.cwd(), 'core');
  if (!fs.existsSync(corePath)) {
    log.error('failed to find Vine.js core, did you installed it correctly?');
    process.exit(1);
  }
  let coreConfig;
  try {
    coreConfig = fs.readFileSync(path.resolve(corePath, 'vine.core.yml'));
  } catch(e) {
    log.error('failed to load vine.core.yml, please check your config.');
    process.exit(1);
  }
  coreConfig = yamlParser(corePath, 'vine.core.yml');
  // console.log(coreConfig);
  log.info('🚀 start building project to dist folder!');
  const buildProcess = ora('building, please wait a moment...\n');
  buildProcess.start();
  await cmd.run('cd core && npm run build', function(err, data, stderr) {
    if (err) {
      log.error(stderr);
      buildProcess.fail('failed to build this project.');
    } else {
      buildProcess.succeed('😎 Vine.js build successfully!');
      if (callback) {
        callback();
      }
    }
  });
};

module.exports = handleBuild;
