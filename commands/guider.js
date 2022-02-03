const handleGuider = (userPort) => {
  console.log("executing guider command");
  let port = 9870;
  if (userPort) {
    port = userPort;
  }
  console.log(`vine guider is running at ${port}, press ctrl+C to stop.`);
}

module.exports = handleGuider;