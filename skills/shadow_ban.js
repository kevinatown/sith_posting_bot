const wordfilter = require('wordfilter');
const _ = require('lodash');
const moment = require('moment');
const { banUser } = require('../utils/ban_helpers.js');

module.exports = function(controller) {
  controller.hears(['ban roulette'], 'direct_message,direct_mention,mention', async function(bot, message) {
    if (message.match) {
      await bot.api.conversations.members({
        channel: message.channel,
        token: process.env.slackToken
      }, async (err,response) => {
        
        const members = response.members;
       
        // remove the bot
        _.pull(members, 'U011CDSB32P');
        
        const newBannedUser = _.sample(members);
        
        await banUser(newBannedUser, message.channel, controller);
        
        bot.api.chat.postMessage({
          channel: message.channel,
          token: process.env.slackToken,
          text: `<@${newBannedUser}> was banned for 24hrs.`
        });
        
        bot.api.im.open({
          user: newBannedUser
        }, (err,response) => {  
          console.log('im open cb', err, response)
          if (response.ok) {
            bot.api.chat.postMessage({
              channel: response.channel.id,
              token: process.env.slackToken,
              text: 'You have been shadow banned for 24 hours'
            });
          }
        });
      });
      // bot.reply(message, `You're new destiny is ${value}`);
    }
  });
};

