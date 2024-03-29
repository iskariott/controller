const moment = require('./moment.min.js');
const fs = require('fs');
const { secondsLeftUntilNextDay, shuffle } = require('./utils.js');
const { SORT_TYPE, NRAND, ACC_PACK } = require('../config.js');

async function getAccs(walletsAmount) {
  if (SORT_TYPE === 2) {
    return Array.from({ length: NRAND }, () => Math.floor(Math.random() * walletsAmount));
  } else if (SORT_TYPE === 3) {
    return shuffle(ACC_PACK);
  }
  const date = new Date();
  const accs = JSON.parse(fs.readFileSync('./sorted_accs.json'));
  const keys = Object.keys(accs);
  if (SORT_TYPE === 1) {
    let day;
    while (true) {
      day = keys.find((d) => parseInt(d.slice(1)) === date.getDate());
      if (!day) await cliCountDown(secondsLeftUntilNextDay());
      else break;
    }
    return accs[day];
  } else {
    const weekNumber = moment(date).week();
    const week = keys.find((w) => parseInt(w.slice(1)) === weekNumber);
    const weekKeys = Object.keys(accs[week]);
    const day = weekKeys.find((d) => parseInt(d.slice(1)) === date.getDay());
    return accs[week][day];
  }
}

module.exports = { getAccs };
