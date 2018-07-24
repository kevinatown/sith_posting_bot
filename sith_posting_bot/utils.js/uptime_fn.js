// 
// Utils for determining uptime
// 

const stats = {
  triggers: 0,
  convos: 0,
}

/* Utility function to format uptime */
const formatUptime = (uptime) => {
  let unit = 'second';
  if (uptime > 60) {
      uptime = uptime / 60;
      unit = 'minute';
  }
  if (uptime > 60) {
      uptime = uptime / 60;
      unit = 'hour';
  }
  if (uptime != 1) {
      unit = unit + 's';
  }

  uptime = parseInt(uptime) + ' ' + unit;
  return uptime;
};

module.exports = {
  formatUptime,
  stats
};
