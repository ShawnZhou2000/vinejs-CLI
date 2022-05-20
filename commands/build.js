const log = require("../utils/colorLog");
const cmd = require('node-cmd');
const ora = require('ora');
const fs = require('fs');
const fsex = require('fs-extra');
const path = require('path');
const yamlParser = require('../utils/yamlParser');
const chalk = require('chalk');
let coreConfig;

function convertEachMdAtCache(dir) {
  let pathLikeName = path.resolve(process.cwd(), '.vine_cache/posts', dir);
  if (fs.lstatSync(pathLikeName).isDirectory()) {
    let subDir = fs.readdirSync(pathLikeName);
    subDir.forEach(eachSubDir => {
      convertEachMdAtCache(`${dir}/${eachSubDir}`);
    })
    subDir = null;
  } else {
    // 走到这里说明是 .md 或 .vue 文件
    const prefixType = dir.replace(/\/\S+\.md/, '').replace(/.md/, '');
    let file = fs.readFileSync(pathLikeName, 'utf-8');
    switch (coreConfig.name) {
      case 'blog core':
        let fileBuffer = file.split('---');
        fileBuffer.unshift('---');
        fileBuffer.splice(3, 0, `---\n<layout :render="'${prefixType}'" />\n<article>`);
        fileBuffer.push(`\n</article>\n`);
        file = fileBuffer.join('');
        fs.writeFileSync(pathLikeName, file);
        log.info(`Resolve post files: ${chalk.blueBright(dir)}`);
        break;
      default:
        break;
    }
    
  }
  pathLikeName = null;
}

const handleBuild = async (callback) => {
  log.logo();
  log.info('Start building static website...');
  // Step 1. 检查主核心配置文件是否存在
  const corePath = path.resolve(process.cwd(), 'core');
  if (!fs.existsSync(corePath)) {
    log.error('failed to find Vine.js core, did you installed it correctly?');
    process.exit(1);
  }
  try {
    coreConfig = fs.readFileSync(path.resolve(corePath, 'vine.core.yml'));
  } catch(e) {
    log.error('failed to load vine.core.yml, please check your config.');
    process.exit(1);
  }
  coreConfig = yamlParser(corePath, 'vine.core.yml');

  // Step 2. 将posts文件夹复制到.vine_cache中
  // Step 3. 给每个文件添加组件标记
  const cacheDirName = path.resolve(process.cwd(), '.vine_cache');
  const postsDirName = path.resolve(process.cwd(), 'core/posts');
  const cachePostDirName = path.resolve(cacheDirName, 'posts');
  fsex.remove(cacheDirName)
  .then(() => {
    log.info('Cleared .vine_cache folder.');
    fsex.ensureDirSync(cacheDirName);
    return fsex.copy(postsDirName, cachePostDirName);
  })
  .then(() => {
    const cachePostDir = fs.readdirSync(cachePostDirName);
    cachePostDir.forEach(dir => {
      convertEachMdAtCache(dir);
    })
  })
  .catch(err => {
    log.error('Failed to build.');
    log.error(err);
    process.exit(1);
  })
  

  // TODO: 在这里添加扩展件整合逻辑
  log.info('🚀 start building project to dist folder!');
  const buildProcess = ora('building, please wait a moment...\n');
  buildProcess.start();
  await cmd.run('cd core && npm run build', function(err, data, stderr) {
    if (err) {
      log.error(stderr);
      buildProcess.fail('failed to build this project.');
    } else {
      buildProcess.succeed('😎 Vine.js build successfully!');
      if (callback) {
        callback();
      }
    }
  });
};

module.exports = handleBuild;
