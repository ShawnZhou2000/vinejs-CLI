const yaml = require('js-yaml');
const fs = require('fs');
const log = require('./colorLog');
const path = require('path');
let yamlData = {};

module.exports = function (localDir, pathName) {
  try {
    const dir = path.resolve(localDir, pathName);
    yamlData = yaml.load(fs.readFileSync(dir, 'utf-8'));
  } catch (e) {
    log.error(`error in reading yaml files '${pathName}', please check your config.`);
    log.error(e);
    // log.help();
    process.exit(1);
  } finally {
    return yamlData;
  }
}