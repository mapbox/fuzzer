var test = require('tap').test,
    fs = require('fs'),
    fuzzer = require('../');

var REGENERATE = false;

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
    t.end();
});

test('fc', function(t) {
    var inputObject = JSON.parse(fs.readFileSync(__dirname + '/data/fc.json'));
    var fc = fuzzer.mutate.object(inputObject.input);
    var outputs = [];
    for (var i = 0; i < 10; i++) {
        outputs.push(fc());
    }
    t.deepEqual(inputObject.output, outputs, 'generates correct output');
    if (REGENERATE) {
        inputObject.output = outputs;
        fs.writeFileSync(__dirname + '/data/fc.json', JSON.stringify(inputObject, null, 4));
    }
    t.end();
});

test('mutate string', function(t) {
    var inputObject = JSON.parse(fs.readFileSync(__dirname + '/data/string.json'));
    var outputs = [];
    for (var i = 0; i < 10; i++) {
        outputs.push(fuzzer.mutate.string(inputObject.input));
    }
    t.deepEqual(inputObject.output, outputs, 'generates correct output');
    if (REGENERATE) {
        inputObject.output = outputs;
        fs.writeFileSync(__dirname + '/data/string.json', JSON.stringify(inputObject, null, 4));
    }
    t.end();
});
