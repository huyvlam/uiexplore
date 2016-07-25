// Add coma to long numbers
// ex: addComa(12345678) -> 12,345,678
function addComa(number) {
  var convert = number.toString(),

      remain = convert.length % 3,

      numberOfComa = Math.floor(convert.length / 3),

      result = remain ? convert.substr(0, remain) + ',' : '';

  for (let i = 0; i < numberOfComa; i++) {
    let position = remain + i * 3,

        coma = (i === numberOfComa - 1) ? '' : ',';

    result += convert.substr(position, 3) + coma;
  }

  return result;
}
