const { DELAY, SORT_TYPE } = require('./config.js');
const { sortAccs } = require('./utils/sortAccs.js');
const fs = require('fs');
const { secondsLeftUntilNextDay, readWallets, cliCountDown } = require('./utils/utils.js');
const { getAccs } = require('./utils/getAccs.js');

(async () => {
  const pathWallets = process.argv[2];
  const pathModule = process.argv[3];
  if (SORT_TYPE !== 2 && !fs.existsSync('./sorted_accs.json')) sortAccs();
  const pkeys = readWallets(pathWallets);
  if (!pkeys) return;
  while (true) {
    const date = new Date().getDate();
    const accs = await getAccs(pkeys.length);
    console.log('Accounts = ', accs);
    for (let i = 0; i < accs.length; i++) {
      console.log(`${i}. Account ${accs[i]}`);
      await require(pathModule)(pkeys[accs[i]]);
      await cliCountDown(Math.floor(Math.random() * (DELAY[1] - DELAY[0]) + DELAY[0]));
    }
    if (date + 1 === new Date().getDate()) continue;
    await cliCountDown(secondsLeftUntilNextDay() + Math.floor(Math.random() * 900));
  }
})();
