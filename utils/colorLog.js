const chalk = require('chalk');

const log = {
  info(str) {
    console.log(chalk.bgGreen.bold(" INFO ") + '  ' + str);
  },
  warn(str) {
    console.log(chalk.bgYellow.bold(" WARN ") + '  ' + str);
  },
  error(str) {
    console.log(chalk.bgRed.bold(" ERR! ") + '  ' + str);
  },
  title(str) {
    console.log(chalk.bgBlueBright.bold(`  --- ${str} ---  `));
  },
  dbLine(title, description) {
    console.log(`※ ${chalk.cyan(title)}: \n   ${description}`);
  },
  help() {
    console.log(chalk.bgBlueBright.bold(" INFO ") +  '  we need your help to fix this bug');
    console.log(
      chalk.bgBlueBright.bold(" INFO ") +
      `  please submit an issue at ${chalk.underline('https://github.com/ShawnZhou2000/@vinejs/issues')}`
    );
  }
}

module.exports = log;