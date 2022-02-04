const ymlConfig = require('./getYMLConfig');
const base = ymlConfig(__dirname, '../vine_data.yml', 'base');
module.exports = base[0];