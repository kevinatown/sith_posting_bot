const wordfilter = require('wordfilter');
const _ = require('lodash');
const moment = require('moment');
const { addKarma, removeKarma, getCurrentKarma } = require('../utils/karma_helpers.js')

module.exports = function(controller) {
  controller.hears([new RegExp(/(<@[A-Z0-9]*>)\s?\+\+/)], 'direct_message,direct_mention,ambient,mention', async function(bot, message) {
    if (message.match[1]) {
      const user = message.match[1].slice(2,-1);
      if (user !== message.user) {
        await addKarma(user, controller);
        const currKarma = await getCurrentKarma(user, controller);
        bot.reply(message, `${message.match[1]}'s karma is now at ${currKarma}`);
      } else {
        await removeKarma(user, controller);
        const currKarma = await getCurrentKarma(user, controller);
        bot.reply(message, `${message.match[1]}'s karma is now at ${currKarma}`);
      }
    }
  });
  
  controller.hears([new RegExp(/(<@[A-Z0-9]*>)\s?\-\-/)], 'direct_message,direct_mention,ambient,mention', async function(bot, message) {
    if (message.match[1]) {
      const user = message.match[1].slice(2,-1);
      await removeKarma(user, controller);
      const currKarma = await getCurrentKarma(user, controller);
      bot.reply(message, `${message.match[1]}'s karma is now at ${currKarma}`);
    }
  });
};

