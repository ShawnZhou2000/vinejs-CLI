const fs = require('fs');
const packageData = JSON.parse(fs.readFileSync('./package.json'));
module.exports = packageData;