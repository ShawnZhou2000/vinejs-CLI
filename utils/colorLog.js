const chalk = require('chalk');

const log = {
  info(str) {
    console.log(chalk.bgGreen.bold(" INFO ") + "  " + str);
  },
  warn(str) {
    console.log(chalk.bgYellow.bold(" WARN ") + "  " + str);
  },
  error(str) {
    console.log(chalk.bgRed.bold(" ERR! ") + "  " + str)
  }
}

module.exports = log;