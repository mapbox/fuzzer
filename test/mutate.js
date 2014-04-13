var test = require('tap').test,
    fuzzer = require('../');

test('mutate object', function(t) {
    fuzzer.seed(0);
    var mutator = fuzzer.mutate.object({
        name: 'Tom',
        height: 72
    });
    t.deepEqual(mutator(), {
        name: "md7dNjtvYKx"
    });
    t.deepEqual(mutator(), {
    });

    var fc = fuzzer.mutate.object({
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [0, 0]
                }
            }
        ]
    });
    t.deepEqual(fc(), {
        "type" : "itcellxUyrLzniju",
        "features" : [{
            "geometry" : {
                "type" : "oJyXZDttoNG",
                "coordinates" : []
            }
        }]
    });
    t.deepEqual(fc(), {
        type: 'oCerutk0xJ_lY3CI'
    });
    t.deepEqual(fc(), {
        type: 'JM3lUsBaoJ',
        features: []
    });
    t.end();
});
