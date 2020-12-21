const _ = require('lodash');
const { eightBallGifs } = require('../data/eight_ball.js');

module.exports = function(controller) {
  controller.hears([new RegExp(/(magic 8-ball)\s\w+/i),], 'direct_message,direct_mention,mention', async function(bot, message) {
    if (message.match) {  
      const answer = _.sample(eightBallGifs);
      bot.api.chat.postMessage({
        channel: message.channel,
        ts: message.ts,
        unfurl_media: true,
        unfurl_links: true,
        token: process.env.slackToken,
        attachments: [
          {
            image_url: answer,
            text: ``
          }
        ]
      }, (err,response) => { console.log(err) });
    }
  });
};
