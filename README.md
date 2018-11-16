# compound-word-splitter

built and tested using node v7.10.1 

Split any amount of english words joined into one word into an array of words
e.g.: "helloworld" => ["hello", "world"]
@param word {string}
@returns {*}


## Install

npm i compound-word-splitter

## Usage

```
const compoundWordSplitter = require('compound-word-splitter');
console.log(compoundWordSplitter('helloworld');
console.log(compoundWordSplitter('underworld');
```

src was pretty much transpiled from the python module, splitter