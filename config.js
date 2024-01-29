/*
0 - Сортує ACCOUNTS_AMOUNT на 4 тижня поточного місяця ( 4 транзи в місяць на акк). 
1 - Сортує ACCOUNTS_AMOUNT на 30 днів (1 транза в місяць на акк)
2 - Бере NRAND рандомних акаунтів з wallets.txt і проганяє раз в день
3 - Рандомізує і проганяє по черзі ACC_PACK
*/
const SORT_TYPE = 3;

/*
Потрібно тільки якщо вибрано SORT_TYPE 3
*/
const ACC_PACK = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/*
Потрібно тільки якщо вибрано SORT_TYPE 0/1
*/
const ACCOUNTS_AMOUNT = 100;

/*
Потрібно тільки якщо вибрано SORT_TYPE 2
*/
const NRAND = 3;

/*
Затримка між акаунтами
*/
const DELAY = [3, 4];

module.exports = {
  ACCOUNTS_AMOUNT,
  SORT_TYPE,
  DELAY,
  NRAND,
  ACC_PACK,
};
