module.exports = function(controller) {
  
  controller.hears(['docker'], 'ambient,direct_message,direct_mention,mention', async function(bot, message) {
    if (message.match) {
      const john = `@UQBE23BJB`;
      const { channel } = message;
      bot.api.chat.postMessage(
        {
          channel,
          text: 'I have learned the truth. REEEEEEEE',
          // unfurl_media: true,
          // unfurl_links: true,
          // as_user: false,
          username: 'John Mahoney',
          token: process.env.slackToken,
          icon_url: 'https://firebasestorage.googleapis.com/v0/b/spbot-2d537.appspot.com/o/docker.png?alt=media&token=956c3373-a8c6-4b8f-8cc3-01bb4fd119f3',
          attachments: [
            {
              image_url: 'https://firebasestorage.googleapis.com/v0/b/spbot-2d537.appspot.com/o/john%20docker.png?alt=media&token=067f8573-f8e2-4247-91e6-daaf5b523035',
              "id": 1,
              text: ''
            }
          ]
        },
        (err, response) => {
          if (err) console.log(err);
        });
    }
  });
};

