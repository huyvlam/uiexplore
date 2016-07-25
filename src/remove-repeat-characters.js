//Ex: removeConsecutiveRepeat('aabccddeff') -> abcdef
function removeConsecutiveRepeat(text) {
  for (let i = 0; i < text.length; i++) {
    text = text.replace(
      RegExp(text[i] + '+', 'ig'),
      text[i]
    );
  }

  return text;
}
