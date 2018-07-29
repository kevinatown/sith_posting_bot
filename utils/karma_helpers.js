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

const userExsists = (user, controller) => {
  const userObj = controller.storage.users.get(user);
  return !_.isNil(userObj);
};

const getCurrentKarma = (user, controller) => {
  return _.get(controller.storage.users.get(user), 'karma');
};

const addKarma = (user, controller) => {
  if (userExsists(user)) {
    const curKarma = getCurrentKarma(user, controller);
    setKarma(curKarma + 1, user, controller);
  } else {
    intializeUser(user, controller);
    setKarma(1, user, controller);
  }
};

const removeKarma = (user, controller) => {
  if (userExsists(user)) {
    const curKarma = getCurrentKarma(user, controller);
    setKarma(curKarma - 1, user, controller);
  } else {
    intializeUser(user, controller);
    setKarma(-1, user, controller);
  }
};

module.exports = {
  addKarma,
  removeKarma
};
