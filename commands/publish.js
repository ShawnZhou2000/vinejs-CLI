const log = require('../utils/colorLog');
const path = require('path');

const handlePublish = () => {
  log.info('Start to publish your website...');
  const publishFn = require(path.resolve(process.cwd(), 'deployer/index.js'));
  publishFn();
}

module.exports = handlePublish;