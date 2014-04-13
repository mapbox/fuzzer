[![Build Status](https://travis-ci.org/tmcw/fuzzer.svg?branch=master)](https://travis-ci.org/tmcw/fuzzer)

# fuzzer

A [fuzzer](http://en.wikipedia.org/wiki/Fuzz_testing) for testing. This implements
mutation fuzzing, in which an expect input is mutated (changed) many times
in order to trigger unexpected behavior or crashes.

## install

    npm install fuzzer

## api

### fuzzer.mutate.object(obj)

Generate a mutated version of an object. This does not modify the object
directly, but returns a modified copy. This mutation will increment and
decrement numbers, randomize arrays, remove properties, and more.

### fuzzer.seed(number)

Seed the random number generator `random-js` that determines mutations.
By calling this function with the same number, you can generate the same
mutations consistently.

## example

```js
var test = require('tap').test,
    fuzzer = require('fuzzer');

fuzzer.seed(0);

test('something', function(t) {
    var generator = fuzzer.mutate.object(yourTestingInput);
    for (var i = 0; i < 1000; i++) {
        t.doesNotThrow(function() {
            yourLibrary(generator());
        });
    }
});
```
