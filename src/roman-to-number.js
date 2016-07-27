/**
 * romanToNumber
 * @author: Huy Lam
 * @desc: convert a roman numeral to whole number
 * @return: {number}
 * @use: toInteger('MCMXC') -> 1990
 */

function romanToNumber(numeral) {
  var map = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
      },

      result = map[
        numeral[numeral.length - 1].toUpperCase()
      ];

  for (let i = numeral.length - 2; i >= 0; i--) {
    let current = map[
          numeral[i].toUpperCase()
        ],

        previous = map[
          numeral[i + 1].toUpperCase()
        ];

    result += (previous > current) ? -current : current;
  }

  return result;
}
