module.exports = function(controller) { 
  // TODO: figure out channel id
  controller.middleware.receive.use(function(bot, message, next) {
    if (message.channel === 'GAVAJML07' || message.user === 'UAU3TNC5R') {
      next();
    }
  });
}
