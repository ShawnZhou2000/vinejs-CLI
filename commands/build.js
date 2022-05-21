const log = require("../utils/colorLog");
const cmd = require('node-cmd');
const ora = require('ora');
const fs = require('fs');
const fsex = require('fs-extra');
const path = require('path');
const yamlParser = require('../utils/yamlParser');
const chalk = require('chalk');
const CACHE_DIR = "core/cache_posts";
let coreConfig;
let buildProcess;
let serviceLog;

function convertEachMdAtCache(dir) {
  let pathLikeName = path.resolve(process.cwd(), CACHE_DIR, dir);
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
    let fileBuffer = [];
    switch (coreConfig.name) {
      case 'blog core':
        if (prefixType === 'articles' || prefixType === 'about') {
          fileBuffer = file.split('---');
          fileBuffer.unshift('---');
          fileBuffer.splice(3, 0, `---\n<layout :render="'${prefixType}'" />\n<article>`);
          fileBuffer.push(`\n</article>\n`);
          file = fileBuffer.join('');
          fs.writeFileSync(pathLikeName, file);
        }
        log.info(`Resolve post files: ${chalk.blueBright(dir)}`);
        break;
      default:
        break;
    }
    
  }
  pathLikeName = null;
}

const handleBuild = async (callback) => {
  // Step 1. 检查主核心配置文件是否存在
  // Step 2. 将posts文件夹复制到CACHE_DIR中
  // Step 3. 给每个文件添加组件标记
  const cacheDirName = path.resolve(process.cwd(), CACHE_DIR);
  const postsDirName = path.resolve(process.cwd(), 'core/posts');
  const corePath = path.resolve(process.cwd(), 'core');
  log.logo();
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
  log.info('Connecting Vine.js base environment...');
  // serviceLog = await cmd.run('cd base && npm run dev');
  // setTimeout(() => {
  //   fn();
  // }, 6000);
  fn();
  function fn() {
    fsex.remove(cacheDirName)
    .then(() => {
      log.info('Cleared cache folder.');
      fsex.ensureDirSync(cacheDirName);
      return fsex.copy(postsDirName, cacheDirName);
    })
    .then(() => {
      const cachePostDir = fs.readdirSync(cacheDirName);
      cachePostDir.forEach(dir => {
        convertEachMdAtCache(dir);
      })
    })
    .catch(err => {
      log.error('Failed to build.');
      log.error(err);
      process.exit(1);
    })
    .then(() => {
      log.info('🚀 start building project to dist folder!');
      buildProcess = ora('building, please wait a moment...\n');
      buildProcess.start();
      return new Promise((resolve, reject) => {
        cmd.run('cd core && npm run build', function(err, data, stderr) {
          if (err) {
            reject(stderr);
          } else {
            resolve(data);
          }
        });
      })
    })
    .then(res => {
      console.log(res);
      buildProcess.succeed('😎 Vine.js build successfully!');
      // fsex.remove(cacheDirName);
      if (callback) {
        callback();
      }
    })
    .catch(err => {
      log.error(err);
      buildProcess.fail('failed to build this project.');
    })
    .finally(() => {
      // cmd.runSync(`taskkill /pid ${serviceLog.pid} -t -f`);
    })
  }
};

module.exports = handleBuild;
