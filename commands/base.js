const cmd = require('node-cmd');
const log = require('../utils/colorLog');

const handleBase = () => {
  log.info('DEBUG base launched. press ctrl + C to stop.');
  cmd.run('cd base && npm run dev');
}

module.exports = handleBase;