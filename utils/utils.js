const moment = require('./moment.min.js');
const readline = require('readline');
const fs = require('fs');

function readWallets(filePath) {
  const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
  if (!data.length) {
    console.log(`${filePath} is empty`);
    return false;
  }
  return data.toString().trim().split('\r\n');
}

function cliCountDown(time_s) {
  return new Promise((resolve) => {
    function updateLine(time_s, finish = false) {
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
      if (!finish) {
        const time = moment.utc(time_s * 1000).format('HH:mm:ss');
        process.stdout.write(`Delay: ${time}`);
      }
    }
    let timer = setInterval(() => {
      time_s -= 1;
      if (time_s <= 0) {
        clearInterval(timer);
        updateLine(0, true);
        resolve();
      } else {
        updateLine(time_s);
      }
    }, 1000);
  });
}

function secondsLeftUntilNextDay() {
  return (
    Math.abs(
      moment().diff(
        moment(`${moment().add(1, 'day').format('YYYY-MM-DD')} 00:00:00`, 'YYYY-MM-DD HH:mm:ss'),
      ),
    ) / 1000
  );
}

function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex > 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function round(value) {
  const m = value % 1;
  if (!value) return value;
  else if (Math.floor(m * 10) < 5) return Math.floor(value);
  else return Math.floor(value) + 1;
}

module.exports = {
  shuffle,
  round,
  cliCountDown,
  readWallets,
  secondsLeftUntilNextDay,
};
