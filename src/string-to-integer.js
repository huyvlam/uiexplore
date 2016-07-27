/**
 * stringToInteger
 * @author: Huy Lam
 * @desc: convert a given string to integer
 * @return {integer} by joining character code of each character
 * @use: toInteger('Aha') ->6510497
 */

function toInt(text) {
  var result = 0;

  text.replace(/\s/g, '');

  for (let i = 0; i < text.length; i++) {
    result += text[i].charCodeAt();
  }

  return result;
}
