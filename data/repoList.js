const yaml = require('js-yaml');
const fs = require('fs');
const log = require('../utils/colorLog');
const path = require('path');
let repoData = {};
try {
  const dir = path.join(__dirname, '/repo_config.yml');
  repoData = yaml.load(fs.readFileSync(dir, 'utf-8'));
} catch (e) {
  log.error("repo data error, please check your repo config.");
  log.error(e);
} finally {
  module.exports = repoData;
}