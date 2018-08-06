/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's `hears` handler functions.

In these examples, Botkit is configured to listen for certain phrases, and then
respond immediately with a single line response.

*/

var wordfilter = require('wordfilter');
var _ = require('lodash');
var moment = require('moment');
var { stats, formatUptime } = require('../utils/uptime_fn.js');

module.exports = function(controller) {

  /* Collect some very simple runtime stats for use in the uptime/debug command */
  
  const shameSomeone = (maxShames, name, times, message, bot) => {
    bot.reply(message, `*SHAME ${name}*`);
    times++;
    if (times < maxShames-1) {
      setTimeout(() => shameSomeone(maxShames, name, times, message, bot), 1000);
    }
  }

  controller.on('heard_trigger', function() {
    stats.triggers++;
  });

  controller.on('conversationStarted', function() {
    stats.convos++;
  });

  controller.hears(['^uptime','^debug'], 'direct_message,direct_mention', function(bot, message) {
    bot.createConversation(message, function(err, convo) {
      if (!err) {
        convo.setVar('uptime', formatUptime(process.uptime()));
        convo.setVar('convos', stats.convos);
        convo.setVar('triggers', stats.triggers);

        convo.say('My main process has been online for {{vars.uptime}}. Since booting, I have heard {{vars.triggers}} triggers, and conducted {{vars.convos}} conversations.');
        convo.activate();
      }
    });
  });

  controller.hears(['^say (.*)','^say'], 'direct_message,direct_mention', function(bot, message) {
    if (message.match[1]) {
      if (!wordfilter.blacklisted(message.match[1])) {
        bot.reply(message, message.match[1]);
      } else {
        bot.reply(message, '_sigh_');
      }
    } else {
      bot.reply(message, 'I will repeat whatever you say.')
    }

  });
  
  
  // 
  // TODO: enable this once the room code is enabled
  // 
  // controller.hears([new RegExp(/^shame (<@[A-Z0-9]*>)(\s\d)?/i)], 'direct_message,direct_mention,ambient,mention', function(bot, message) {
  //   if (message.match[1] && message.match[1] !== '<@UAUUZAUCD>') {
  //     const times = 0;
  //     const name = message.match[1];
  //     const maxShames = message.match[2] ? parseInt(_.trim(message.match[2]), 10) : 3;
  //     bot.reply(message, `*SHAME ${name}*`);
  //     setTimeout(() => shameSomeone(maxShames, name, times, message, bot), 1000);
  //   } else if (message.match[1] && message.match[1] === '<@UAUUZAUCD>') {
  //     const times = 0;
  //     const name = `<@${message.event.user}>`;
  //     const maxShames = message.match[2] ? parseInt(_.trim(message.match[2]), 10) : 3;
  //     bot.reply(message, `*HAHA NICE TRY! ${name}*`);
  //     bot.reply(message, `*SHAME ${name}*`);
  //     setTimeout(() => shameSomeone(maxShames, name, times, message, bot), 1000);
  //   }
  // });

};
