/**
 * stringToInteger
 * @author: Huy Lam
 * @desc: hash a given string to integer
 * @return {integer}
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
