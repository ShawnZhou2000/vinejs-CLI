const ymlConfig = require('./getYMLConfig');
const coreList = ymlConfig('', './vine_data.yml', 'core');
let coreNameList = [];
coreList.map((item) => {
  coreNameList.push(item.name);
})

coreNameList.push('I need other core, see https://ext.vinejs.tech/core');

module.exports = coreNameList;