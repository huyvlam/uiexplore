function isAnagram(first, second) {
  try {
    if (!first || !second)
      throw 'Required arguments are missing';

    if (first.constructor !== Array || second.constructor !== Array)
      throw 'Arguments type is incorrect';

    if (first.length !== second.length)
      throw 'Arguments is not equal in size';

    if (first.length > 50 || second.length > 50)
      throw 'Arguments limit is exceeded';
  }
  catch(error) {
    throw error;
  }

  for (var i = 0; i < first.length; i++) {
    try {
      if (first[i].length > 100 || second[i].length > 100)
        throw 'Character exceeded limit';
    }
    catch(error) {
      throw error;
    }

    var firstWord = first[i]
          .split('')
          .sort(
            (charA, charB) => +(charA > charB) || +(charA === charB) - 1
          )
          .join(''),

        secondWord = second[i]
          .split('')
          .sort(
            (charA, charB) => +(charA > charB) || +(charA === charB) - 1
          )
          .join('');

    if (firstWord === secondWord) {
      console.log(1, first[i], second[i]);
    } else {
      console.log(0, first[i], second[i]);
    }
  }
}
