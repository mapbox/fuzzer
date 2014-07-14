[![Build Status](https://travis-ci.org/mapbox/fuzzer.svg?branch=master)](https://travis-ci.org/mapbox/fuzzer)

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

### fuzzer.mutate.string(str)

Generate a mutated version of a string, with reversed, removed, and added
characters.

### fuzzer.seed(number)

Seed the random number generator `random-js` that determines mutations.
By calling this function with the same number, you can generate the same
mutations consistently.

## fuzz-get

If you install this globally it provides a single cli utility called `fuzz-get`.

    npm install -g fuzzer
    fuzz-get "./bin/fuzz-get "http://localhost:8889/foo/bar/your/rest/api"

This will run mutated requests against your server continously - it will mutate the
path requested into other incorrect requests, and log in the form:

    HTTP200:/foo/bar/your/rest/api
    HTTP404:/foo/baryour/rest/api

So you can pipe into `| grep "HTTP500"` if you wish.

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
