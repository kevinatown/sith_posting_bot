//
// Helpers for increasing someone's karma
//

const _ = require("lodash");
const moment = require("moment");

const getChannel = async (channel, controller) => {
  let channelObj;
  const v2 = await controller.storage.channels.get(channel, (err, val) => {
    channelObj = val;
    return val;
  });
  return channelObj;
};

const newRoll = async (channel, controller) => {
  const roll = _.random(0, 10000);
  const oldObj = await controller.storage.channels.get(channel);
  const saveObj = {
    ...oldObj,
    id: channel,
    sith_post: {
      date: moment().unix(),
      value: roll
    }
  };
  controller.storage.channels.save(saveObj);
  return roll;
};

// const sithPostToday = async (channel, controller) => {
//   const channelObj = await getChannel(channel, controller);
//   const dateOfLastRoll = _.get(channelObj, 'sith_post.date');
//   console.log('ob in sith post today', channelObj, dateOfLastRoll);
//   if (!_.isNil(dateOfLastRoll) && moment().diff(moment.unix(dateOfLastRoll), 'days') === 0) {
//     const oldRoll = parseInt(_.get(channelObj, 'sith_post.value') , 10);
//     console.log('is old rol', oldRoll)
//     return (oldRoll % 3) === 0;
//   } else {
//     const roll = await newRoll(channel, controller);
//     return (roll % 3) === 0;
//   }
// };

const sithPostToday = async (channel, controller) => {
  return _.random(0, 10000) % 500 === 0;
};

module.exports = {
  sithPostToday,
  newRoll
};
