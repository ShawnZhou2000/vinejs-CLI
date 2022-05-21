const ymlConfig = require('./getYMLConfig');
const data = ymlConfig(__dirname, '../vine_data.yml', null, 'ORIGIN');
module.exports = (objKey, componentName) => {
  const config = data[objKey];
  let res = null;
  Object.keys(config).forEach(key => {
    if (config[key].name === componentName || config[key].alias === componentName) {
      res = config[key];
    }
  })
  return res;
}
