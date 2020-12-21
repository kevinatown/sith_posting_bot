//
// Helpers for increasing someone's karma
//

const _ = require("lodash");
const moment = require("moment");

const getBannedUser = async (user, channel, controller) => {
  let userObj;
  await controller.storage.channels.get(channel, (err, val) => {
    userObj = val;
  });
  // if (!userObj) {
  //   banUser(user, channel, controller)
  // }
  return userObj ? userObj.bannedUser : false;
};

const banUser = async (user, channel, controller) => {
  let oldObj;
  console.log({ channel });
  await controller.storage.channels.get(channel, (err, val) => {
    oldObj = val;
  });
  controller.storage.channels.save({
    ...oldObj,
    id: channel,
    bannedUser: {
      date: moment().unix(),
      user
    }
  });
};

const getUsersInChannel = async (channel, bot) => {
  let users = [];

  return users;
};

module.exports = {
  banUser,
  getBannedUser,
  getUsersInChannel
};
