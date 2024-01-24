const fs = require('fs');
const { ACCOUNTS_AMOUNT, SORT_TYPE } = require('../config.js');
const { round, shuffle } = require('./utils.js');

function sort4Weeks() {
  let data = {};
  const accsInDay = round(ACCOUNTS_AMOUNT / 7);
  for (let i = 1; i <= 4; i++) {
    let accs = shuffle(Array.from(Array(ACCOUNTS_AMOUNT).keys()));
    const week = 'W' + i;
    for (let j = 1; j <= 7 && accs.length; j++) {
      const day = 'D' + j;
      if (!data[week]) data[week] = { [day]: accs.slice(0, accsInDay) };
      else data[week] = { ...data[week], [day]: accs.slice(0, accsInDay) };
      accs = accs.slice(accsInDay);
    }
  }
  fs.writeFileSync('sorted_accs.json', JSON.stringify(data), 'utf8');
}

function sort4Month() {
  const date = new Date().getDate();
  let data = {};
  let accs = shuffle(Array.from(Array(ACCOUNTS_AMOUNT).keys()));
  const len = 31 - date > ACCOUNTS_AMOUNT ? ACCOUNTS_AMOUNT : 31 - date;
  let groups = Array.from({ length: len }, () => []);
  for (let i = 0; i < accs.length; i++) {
    let groupNumber = (i + 1) % len;
    if (groupNumber === 0) {
      groupNumber = len - 1;
    } else {
      groupNumber--;
    }
    groups[groupNumber].push(accs[i]);
  }
  groups.forEach((itm, idx) => (data['D' + (idx + date)] = itm));
  fs.writeFileSync('sorted_accs.json', JSON.stringify(data), 'utf8');
}

const sortAccs = SORT_TYPE ? sort4Month : sort4Weeks;

module.exports = {
  sortAccs,
};
