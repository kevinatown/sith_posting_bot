const wordfilter = require('wordfilter');
const _ = require('lodash');
const moment = require('moment');
const { starWarsLines } = require('../data/quotes.js');
const { sithPostToday } = require('../utils/sith_post_helper');

module.exports = function(controller) {
  controller.hears(['.*'], 'direct_message,direct_mention,ambient,mention', async function(bot, message) {
    const post = await sithPostToday(message.channel, controller);
    if(post) {
      const line = _.sample(starWarsLines)
      if (line.quote) {
        bot.reply(message, `> *${line.character}* ${line.line}`);
      } else {
        bot.reply(message, `> ${line.line}`);
      }
    }
  });

};
