const log = require('../utils/colorLog');

const handlePublish = (options) => {
  console.log("executing publish command");
  if (options.build) {
    // only build mode
    log.warn("You are using only-build mode to execute publish command.")
  }
}

module.exports = handlePublish;