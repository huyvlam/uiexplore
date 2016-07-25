/**
 * Add Coma
 * @author: Huy Lam
 * @desc: compare concurrent words from array A & B
 * @use: isAnagram(['on', 'shot', 'poo'], ['no', 'host', 'pool'])
 * @return: [true, true, false]
 */

// Add coma to long numbers
// ex: addComa(12345678) -> 12,345,678
function addComa(number) {
  var convert = number.toString(),

      remain = convert.length % 3,

      numberOfComa = Math.floor(convert.length / 3),

      result = remain ?
        convert.substr(0, remain) + ',' :
        '',

      i, coma, position;

  for (i = 0; i < numberOfComa; i++) {
    coma = (i === numberOfComa - 1) ? '' : ',';
    position = remain + i * 3;
    result += convert.substr(position, 3) + coma;
  }

  return result;
}
