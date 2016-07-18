function isOddEven(n) {
  n = Math.floor(Math.abs(n));
  if (!Number.isInteger(n)) return;
  var result = (n % 2 == 0) ? 'even' : 'odd';
  return result;
}

function getOddNumbers(n1, n2) {
  var 
    first, last, range,
    i = 0,
    arr = [];

  first = (isOddEven(n1) == 'odd') ? n1 : n1 + 1;
  last = (isOddEven(n2) == 'odd') ? n2 : n2 - 1;
  range = (last - first) / 2;
  arr.push(first);

  while (i < range) {
    arr.push(arr[i] + 2);
    i++;
  }

  return arr.join(' ');
}

function factorial(num) {
  if (num < 0) return;
  if (num === 0 || num === 1) return 1;

  var result = num;

  while (num > 1) {
    num--;
    result *= num;
  }

  return result;
}
