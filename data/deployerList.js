const ymlConfig = require('./getYMLConfig');
const deployerList = ymlConfig(__dirname, '../vine_data.yml', 'deployer');
let deployerNameList = [];
deployerList.map((item) => {
  deployerNameList.push(item.name);
})

deployerNameList.push('I need other deployer, see https://ext.vinejs.tech/deployer');

module.exports = deployerNameList;