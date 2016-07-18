//Ex: addArticle('owl'); -> An owl
//     addArticle('bowl'); -> A bowl
function addArticle(str) { 
  var article = (new RegExp(/^a|^e|^h|^i|^o/ig).test(str)) ? 'An ' : 'A '; 
  return article + str; 
}

//Ex: reverseCharacters('abcdefg'); -> gfedcba
function reverseCharacters(str) {
  var 
    arr = [], 
    i = str.length - 1;

  while (i >= 0) {
    arr.push(str[i]);
    i--;
  }

  return arr.join('');
}

//Ex: removeConsecutiveRepeat('aabccddeff') -> abcdef
function removeConsecutiveRepeat(str) {
  for (var i = 0; i < str.length; i++) {
    str = str.replace(new RegExp(str[i] + '+', 'ig'), str[i]);
  }
  return str;
}

//Ex: isAnagrams('host', 'shot') -> true
//    isAnagrams('dad', 'add') -> false
function isAnagrams(str1, str2) {
  return str1.split('').sort().join('') === str2.split('').sort().join('');
}

//Ex: matchBraces('(){[]}') -> true
//    matchBraces('[(]){}') -> false
function matchBraces(str) {
  var matches = /\[\]|{}|\(\)/g,
    isMatched = matches.test(str),
    reduced;

  if (isMatched) {
    reduced = str.replace(matches, '');

    return matchBraces(reduced);
  }

  return !str.length;
}

function matchBracesUsingStack(chars) {
  var stack = new Stack();

  for (var i = 0; i < chars.length; i++) {
    var char = chars[i],
      leftExp = /{|\[|\(/g,
      isLeft = leftExp.test(char),
      rightExp = /}|\]|\)/g,
      isRight = rightExp.test(char);

    if (isLeft) {
      stack.push(char);
    } else {
      if (char === '}' && stack.top() === '{') {
        stack.pop();
      } else if (char === ']' && stack.top() === '[') {
        stack.pop();
      } else if (char === ')' && stack.top() === '(') {
        stack.pop();
      } else {
        stack.push(char);
      }
    }
  }

  return stack.isEmpty();
}
