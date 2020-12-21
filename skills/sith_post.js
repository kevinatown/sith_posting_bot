const wordfilter = require('wordfilter');
const _ = require('lodash');
const moment = require('moment');
const { newRoll } = require('../utils/sith_post_helper');

module.exports = function(controller) {
  
  controller.hears(['roll it'], 'direct_message,direct_mention,mention', async function(bot, message) {
    if (message.match) {
      const value = await newRoll(message.channel, controller);
      bot.reply(message, `Your new destiny is ${value}`);
    }
  });
};
