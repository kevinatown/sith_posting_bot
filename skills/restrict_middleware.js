module.exports = function(controller) { 
  controller.middleware.receive.use(function(bot, message, next) {
    // console.log(message.channel, message.user);
    if (message.channel === 'GBT2QE5SR' || message.user === 'UAU3TNC5R') {
      next();
    }
  });
}
