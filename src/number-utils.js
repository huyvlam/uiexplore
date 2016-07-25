function factorial(num) {
  return num < 2 ? 1 : num * factorial(num - 1);
}

function isEven(num) {
  return !(num % 2);
}

function getEvenNumbers(from, to) {
  var lower = isEven(from) ? from : from + 1,

      upper = isEven(to) ? to : to - 1,

      results = [lower];

  while (lower < upper) {
    lower = lower + 2;
    results.push(lower);
  }

  return results.join(' ');
}

function getOddNumbers(from, to) {
  var lower = isEven(from) ? from + 1 : from,

      upper = isEven(to) ? to - 1 : to,

      results = [lower];

  while (lower < upper) {
    lower = lower + 2;
    results.push(lower);
  }

  return results.join(' ');
}
