// Check if the braces inside a string are perfectly paired
function findMatchingBraces(text) {
  var braces = /\[\]|{}|\(\)/g,

      hasMatch = braces.test(text),

      newText;

  if (hasMatch) {
    newText = text.replace(braces, '');

    return findMatchingBraces(newText);
  }

  return !text.length;
}
