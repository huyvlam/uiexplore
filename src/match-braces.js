// Check if the braces inside a string are perfectly paired
// @ex: isBraceMatched('[{}])') -> false
function isBraceMatched(text) {
  var braces = /\[\]|{}|\(\)/g,

      hasMatch = braces.test(text),

      newText;

  if (hasMatch) {
    newText = text.replace(braces, '');

    return isBraceMatched(newText);
  }

  return !text.length;
}
