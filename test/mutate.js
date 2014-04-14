var test = require('tap').test,
    fuzzer = require('../');

test('mutate object', function(t) {
    fuzzer.seed(0);
    var mutator = fuzzer.mutate.object({
        name: 'Tom',
        height: 72
    });
    t.deepEqual(mutator(), {
        name: "Tom",
        height: 72
    });
    t.deepEqual(mutator(), {
        name: "Tom",
        height: 72
    });

    var fc = fuzzer.mutate.object({
            "type" : "FeatureCollection", // != "itcellxUyrLzniju"
            "features" : [
              {
                "type" : "Feature", // != undefined
                "geometry" : {
                  "type" : "Point", // != "oJyXZDttoNG"
                  "coordinates" : [
                    0, // != undefined
                    0 // != undefined
                  ]
                }
              }
            ]
          });
    t.deepEqual(fc(), {
            "type" : "FeatureCollection", // != "itcellxUyrLzniju"
            "features" : [
              {
                "type" : "Feature", // != undefined
                "geometry" : {
                  "type" : "Point", // != "oJyXZDttoNG"
                  "coordinates" : [
                    0, // != undefined
                    0 // != undefined
                  ]
                }
              }
            ]
          });
    t.deepEqual(fc(), {
            "type" : "FeatureCollection", // != "oCerutk0xJ_lY3CI"
            "features" : [{
                "geometry" : {
                  "type" : "Point" // != undefined
                } // != undefined
              }] // != undefined
          });
    t.deepEqual(fc(), {
            "type" : "FeatureCollection", // != "JM3lUsBaoJ"
            "features" : [
              {
                "geometry" : {
                  "type" : "Point" // != undefined
                } // != undefined
              } // != undefined
            ]
          });
    t.end();
});

test('mutate string', function(t) {
    t.equal(fuzzer.mutate.string('hello'), 'hello');
    t.equal(fuzzer.mutate.string('hello'), 'hello');
    t.equal(fuzzer.mutate.string('hello'), 'hello');
    t.equal(fuzzer.mutate.string('hello'), 'olleh');
    t.end();
});
