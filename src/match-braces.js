// Check if the braces inside a string are perfectly paired
// @ex: isBraceMatched('[{}])') -> false

// Check for matching brace using Recursive
function isBraceMatched(text) {
  var braces = /\[\]|{}|\(\)/g,

      hasMatch = braces.test(text);

  if (hasMatch) {
    let newText = text.replace(braces, '');

    return isBraceMatched(newText);
  }

  return !text.length;
}

// Check for matching brace using Stack
// @dependency: Stack [https://github.com/huyvlam/algorithm/blob/master/src/ds-stack.js]
function isBraceMatched(text) {
  var stack = new Stack(),

      leftBraces = /{|\[|\(/g;

  for (let i = 0; i < text.length; i++) {
    let brace = text[i],

        isLeft = leftBraces.test(brace);

    if (isLeft) {
      stack.push(brace);

    } else {
      let data = stack.peek() ? stack.peek().data : stack.peek();

      if (brace === '}' && data === '{') {
        stack.pop();

      } else if (brace === ']' && data === '[') {
        stack.pop();

      } else if (brace === ')' && data === '(') {
        stack.pop();

      } else {
        stack.push(brace);
      }
    }
  }

  return stack.isEmpty();
}
