const wordfilter = require('wordfilter');
const _ = require('lodash');
const moment = require('moment');
const { addKarma, removeKarma, getCurrentKarma, getAllUsers, formatUsersKarma } = require('../utils/karma_helpers.js')

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
      const mUser  = message.user;
      const isBot = user === 'U011CDSB32P';
      if (isBot) {
        await removeKarma(mUser, controller);
      } else {
        await removeKarma(user, controller);
      }
      const currKarma = await getCurrentKarma(isBot ? mUser : user, controller);
      bot.reply(message, `${isBot ? `<@${mUser}>` : message.match[1]}'s karma is now at ${currKarma}`);
    }
  });

//   <@U011CDSB32P>
  controller.hears([new RegExp(/\+\+/)], 'direct_message,direct_mention,mention', async function(bot, message) {
    if (message.match) {
      const user = 'U011CDSB32P';
      await addKarma(user, controller);
      const currKarma = await getCurrentKarma(user, controller);
      bot.reply(message, `<@U011CDSB32P>'s karma is now at ${currKarma}`);
    }
  });
  
  controller.hears([new RegExp(/\-\-/)], 'direct_message,direct_mention,mention', async function(bot, message) {
    if (message.match) {
      const user  = message.user;
      const botUser = 'U011CDSB32P';
      await removeKarma(botUser, controller);
      await removeKarma(user, controller);
      const currBotKarma = await getCurrentKarma(botUser, controller);
      const currUserKarma = await getCurrentKarma(user, controller);
      const reply = `<@U011CDSB32P>'s karma is now at ${currBotKarma}\n<@${user}>'s karma is now at ${currUserKarma}`;
      bot.reply(message, reply);
    }
  });
  
  controller.hears(['karma', 'karma count'], 'direct_message,direct_mention,mention', async function(bot, message) {
    if (message.match) {
      const users = await getAllUsers(controller);
      const { lines, roomKarma } = formatUsersKarma(users);
      bot.api.chat.postMessage({
        channel: message.channel,
        text: `${lines}`,
        ts: message.ts,
        unfurl_media: true,
        unfurl_links: true,
        token: process.env.slackToken,
        icon_url: roomKarma > 0 ? 
          'http://cdn.ebaumsworld.com/mediaFiles/picture/2235368/83886184.jpg' :
          'https://i.redd.it/apzz3qxbpf801.jpg'
        // attachments: [
        //   {
        //     image_url: answer,
        //     text: ``
        //   }
        // ]
      }, (err,response) => { console.log(err) });
      // bot.reply(message, );
    }
  });
};

