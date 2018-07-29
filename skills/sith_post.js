const wordfilter = require('wordfilter');
const _ = require('lodash');
const moment = require('moment');
const { starWarsLines } = require('../data/quotes.js');

module.exports = function(controller) {
  controller.hears(['.*'], 'ambient', function(bot, message) {
    controller.storage.teams.save({id: 1111, data: 'test'})
    const line = _.sample(starWarsLines)
    controller.storage.users.save({
      id: message.user,
      karma: 0
    });
    if (line.quote) {
      bot.reply(message, `> *${line.character}* ${line.line}`);
    } else {
      bot.reply(message, `> ${line.line}`);
    }
  });

};
