// 
// Helpers for increasing someone's karma
//

const _ = require('lodash'); 

const intializeUser = (user, controller) => {
  controller.storage.users.save({
    id: user,
    karma: 0
  });
};

const setKarma = (value, user, controller) => {
  controller.storage.users.save({
    id: user,
    karma: value
  });
};

const userExsists = async (user, controller) => {
  const userObj = await getUser(user, controller);
  return !_.isNil(userObj);
};

const getUser = async (user, controller) => {
  let userObj;
  const v2 = await controller.storage.users.get(user, (err, val) => {
    userObj = val;
    return val;
  });
  return userObj;
};

const getCurrentKarma = async (user, controller) => {
  const curUser = await getUser(user, controller);
  const ck = _.get(curUser, 'karma');
  return ck;
};

const addKarma = async (user, controller) => {
  const userExisits = await userExsists(user, controller);
  if (userExisits) {
    const curKarma = await getCurrentKarma(user, controller);
    await setKarma(curKarma + 1, user, controller);
  } else {
    await intializeUser(user, controller);
    setKarma(1, user, controller);
  }
};

const removeKarma = async (user, controller) => {
  const userExisits = await userExsists(user, controller);
  if (userExisits) {
    const curKarma = await getCurrentKarma(user, controller);
    await setKarma(curKarma - 1, user, controller);
  } else {
    await intializeUser(user, controller);
    await setKarma(-1, user, controller);
  }
};

module.exports = {
  addKarma,
  removeKarma,
  getCurrentKarma
};
