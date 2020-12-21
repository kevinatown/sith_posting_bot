const wordfilter = require("wordfilter");
const _ = require("lodash");
const moment = require("moment");
const { starWarsLines } = require("../data/quotes.js");
const { sithPostToday, newRoll } = require("../utils/sith_post_helper");
const { getBannedUser } = require("../utils/ban_helpers.js");

module.exports = function(controller) {
  controller.hears(
    [".*"],
    "ambient,direct_message,direct_mention,mention",
    async function(bot, message) {
      // sith post
      // console.log({ mch: message.channel });

      // console.log({ mch: message.channel });

      // banned user
      // if (message.channel) {
      const bannedUser = await getBannedUser(
        message.user,
        message.channel,
        controller
      );
      // console.log({ bannedUser });
      if (
        !!bannedUser &&
        bannedUser.user === message.user &&
        moment().diff(moment.unix(bannedUser.date), "days") === 0
      ) {
        bot.api.chat.delete(
          {
            channel: message.channel,
            ts: message.ts,
            as_user: true,
            token: process.env.slackTokenAdmin
          },
          (err, response) => {
            // console.log("delete msg cb", err, response);
          }
        );
        // bot.api.chat.update({
        //   text: 'nope',
        //   channel: message.channel,
        //   ts: message.ts,
        //   as_user: true,
        //   token: process.env.slackToken
        // }, (err,response) => {console.log('delete msg cb', err, response)});
      }

      const sithPost = await sithPostToday(message.channel, controller);
      // console.log({ sithPost });
      if (sithPost) {
        const line = _.sample(starWarsLines);
        if (line.quote) {
          bot.api.chat.postMessage({
            channel: message.channel,
            token: process.env.slackToken,
            text: `> *${line.character}* ${line.line}`
          });
        } else {
          bot.api.chat.postMessage({
            channel: message.channel,
            token: process.env.slackToken,
            text: `> ${line.line}`
          });
        }
      } else if (message.type !== "ambient") {
        bot.reply(message, `REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE`);
      }
    }
  );
};
