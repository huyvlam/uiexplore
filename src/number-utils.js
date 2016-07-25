// Return the factorial of a given number
function factorial(number) {
  return number < 2 ? 1 : number * factorial(number - 1);
}

function isEven(number) {
  return !(number % 2);
}

// Return a series of even numbers between 2 given numbers: from, to
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

// Return a series of odd numbers between 2 given numbers: from, to
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
