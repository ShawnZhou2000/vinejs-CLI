const ymlConfig = require('../data/getYMLConfig');
const deployerList = ymlConfig('', './vine_data.yml', 'deployer');

const handleList = (opts) => {
  console.log(opts);
}

module.exports = handleList;