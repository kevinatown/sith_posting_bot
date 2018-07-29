const wordfilter = require('wordfilter');
const _ = require('lodash');
const moment = require('moment');
const { starWarsLines } = require('../data/quotes.js');

module.exports = function(controller) {
  
  controller.hears(['.*'], 'ambient', function(bot, message) {
    const line = _.sample(starWarsLines)
    if (line.quote) {
      bot.reply(message, `*${line.character}* ${line.line}`);
    } else {
      bot.reply(message, `${line.line}`);
    }
  });

};
