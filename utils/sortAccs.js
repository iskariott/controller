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
  let data = {};
  let accs = shuffle(Array.from(Array(ACCOUNTS_AMOUNT).keys()));
  if (ACCOUNTS_AMOUNT <= 30) {
    const arr = [];
    while (arr.length < ACCOUNTS_AMOUNT) {
      const r = Math.floor(Math.random() * 30) + 1;
      if (arr.indexOf(r) === -1) {
        arr.push(r);
        data[['D' + r]] = [accs[arr.length ? arr.length - 1 : arr.length]];
      }
    }
    data = Object.keys(data)
      .sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1)))
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});
  } else if (ACCOUNTS_AMOUNT > 30) {
    let groups = Array.from({ length: 30 }, () => []);
    let accs = shuffle(Array.from(Array(ACCOUNTS_AMOUNT).keys()));
    for (let i = 0; i < accs.length; i++) {
      let groupNumber = (i + 1) % 30;
      if (groupNumber === 0) {
        groupNumber = 30 - 1;
      } else {
        groupNumber--;
      }
      groups[groupNumber].push(accs[i]);
    }
    groups.forEach((itm, idx) => (data['D' + (idx + 1)] = itm));
  }
  fs.writeFileSync('sorted_accs.json', JSON.stringify(data), 'utf8');
}

const sortAccs = SORT_TYPE ? sort4Month : sort4Weeks;

module.exports = {
  sortAccs,
};
