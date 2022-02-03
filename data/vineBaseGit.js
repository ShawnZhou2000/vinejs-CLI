const ymlConfig = require('./getYMLConfig');
const base = ymlConfig('', './vine_data.yml', 'base');
module.exports = base[0];