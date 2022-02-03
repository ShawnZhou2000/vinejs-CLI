const ymlConfig = require('./getYMLConfig');
const deployerList = ymlConfig('', './vine_data.yml', 'deployer');
let deployerNameList = [];
deployerList.map((item) => {
  deployerNameList.push(item.name);
})

deployerNameList.push('I need other deployer, just don\'t set any core, see https://ext.vinejs.tech/core');

module.exports = deployerNameList;