const yamlParser = require('../utils/yamlParser');

module.exports = function (localDir, pathName, objKey, origin) {
  let vineData = yamlParser(localDir, pathName);
 
  if (objKey) {
    vineData = vineData[objKey];
  }
  if (origin === 'ORIGIN') {
    return vineData;
  } else {
    let res = [];
    Object.keys(vineData).forEach(item => {
      res.push(vineData[item]);
    })
    return res;
  }
}