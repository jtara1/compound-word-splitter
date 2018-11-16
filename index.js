const _ = require('lodash');
const checkWords = require('check-word');
const englishWords = checkWords('en');

/**
 *
 * @param character {string}
 * @returns {boolean}
 */
function isUpper(character) {
  return character === character.toUpperCase();
}

function capitalizeFirstCharacter(word) {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
}

function putInArray(value) {
  if (typeof value !== 'object') return [value];
  return value;
}

function concat(...args) {
  args = args.map(putInArray);
  return _.compact([].concat(...args));
}

/**
 * Split any amount of english words joined into one word into an array of words
 * e.g.: "helloworld" => ["hello", "world"]
 * @param word {string}
 * @returns {*}
 */
module.exports = function split(word) {
  const split = module.exports;

  let maxIndex = word.length;
  for (let index in word) {
    let indexDiff = maxIndex - index;

    let leftCompound = word.slice(0, indexDiff);
    let rightCompound1 = word.slice(indexDiff, maxIndex);
    let rightCompound2 = word.slice(indexDiff + 1, maxIndex);

    let rightCompound1Upper, rightCompound2Upper;
    if (rightCompound1) {
      rightCompound1Upper = isUpper(rightCompound1[0]);
    }
    if (rightCompound2) {
      rightCompound2Upper = isUpper(rightCompound2[0]);
    }

    if (index > 0 && leftCompound.length > 1 && !englishWords.check(leftCompound)) {
      leftCompound = capitalizeFirstCharacter(leftCompound);
    }

    let isLeftCompoundValidWord = leftCompound.length > 1 && englishWords.check(leftCompound);
    if (isLeftCompoundValidWord
      && ((split(rightCompound1) !== '' && !rightCompound1Upper)
      || rightCompound1 === '')) {
      return concat(leftCompound, split(rightCompound1));
    }
    else if (isLeftCompoundValidWord
      && word.slice(indexDiff, indexDiff + 1) === 's'
      && ((split(rightCompound2) !== '' && !rightCompound2Upper)
      || rightCompound2 === '')
    ) {
      return concat(leftCompound, split(rightCompound2));
    }
  }

  if (word !== '' && englishWords.check(word)) return [word];
  else if (word !== '' && englishWords.check(capitalizeFirstCharacter(word)))
    return [capitalizeFirstCharacter(word)];
  else return '';
};
