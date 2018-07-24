/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's `hears` handler functions.

In these examples, Botkit is configured to listen for certain phrases, and then
respond immediately with a single line response.

*/

var wordfilter = require('wordfilter');
var _ = require('lodash');
var moment = require('moment');
var { starWarsLines } = require('../data/quotes.js');

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
