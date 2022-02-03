const yamlParser = require('../utils/yamlParser');

module.exports = function (localDir, pathName, objKey) {
  let vineData = yamlParser(localDir, pathName);
  let res = [];
  if (objKey) {
    vineData = vineData[objKey];
  }
  Object.keys(vineData).forEach(item => {
    res.push(vineData[item]);
  })
  return res;
}