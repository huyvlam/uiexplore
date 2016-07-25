/**
 * Anagram
 * @author: Huy Lam
 * @desc: compare concurrent words from array A & B
 * @use: isAnagram(['on', 'shot', 'poo'], ['no', 'host', 'pool'])
 * @return: [true, true, false]
 */


function isAnagram(first, second) {
  var results = [];

  for (let i = 0; i < first.length; i++) {
    let firstWord = first[i]
          .split('')
          .sort(
            (charA, charB) => +(charA > charB) || +(charA === charB) - 1
          )
          .join(''),

        secondWord = second[i]
          .split('')
          .sort(
            (charA, charB) => +(charA > charB) || +(charA === charB) - 1
          )
          .join('');

    if (firstWord === secondWord) {
      results.push(true);
    } else {
      results.push(false);
    }
  }

  return results;
}
