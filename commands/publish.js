const log = require('../utils/colorLog');
const path = require('path');
const yamlParser = require('../utils/yamlParser');

const handlePublish = () => {
  log.info('Start to publish your website...');
  // publishFn();
  const data = yamlParser(process.cwd(), 'vine.deployer.yml');
  if (data === null) {
    log.error('Got empty deployer configuration, did you forget to config?');
    log.info('you can copy config template from https://vinejs.tech/deployer');
    process.exit(1);
  }
  const publishFn = require(path.resolve(process.cwd(), `./base/node_modules/vinejs-${data.type}-deployer`));
  publishFn();
}

module.exports = handlePublish;