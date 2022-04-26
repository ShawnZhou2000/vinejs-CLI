const log = require('../utils/colorLog');
const ora = require('ora');

const handlePublish = () => {
  log.info('Start to publish your website...');
  const publishFn = require('./deployer/bin/index.js');
  publishFn();
}

module.exports = handlePublish;