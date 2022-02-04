const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../package.json');
const packageData = JSON.parse(fs.readFileSync(dir));
module.exports = packageData;