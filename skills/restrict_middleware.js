module.exports = function(controller) { 
  controller.middleware.receive.use(function(bot, message, next) {
    if (message.channel === 'GBT2QE5SR' || message.user === 'UAU3TNC5R') {
      next();
    }
  });
}
