var Random = require('random-js'),
    xtend = require('xtend'),
    traverse = require('traverse');

var random = new Random(Random.engines.mt19937().seed(0));

/**
 * @param _ {number}
 * @returns {null}
 */
module.exports.seed = function(_) {
    random = new Random(Random.engines.mt19937().seed(_));
};

module.exports.mutate = {
    object: mutateObject,
    string: mutateString
};

function mutateObject(obj) {
    return function generate() {
        // copy the object so that modifications
        // are not additive
        var copy = xtend({}, obj);
        traverse(copy).forEach(transformObjectValue);
        return copy;
    };
}

function transformObjectValue(val) {
    if (random.bool(0.1)) {
        mutateVal.call(this, val);
    } else if (random.bool(0.05)) {
        if (this.level) {
            this.remove();
        }
    }
}

function mutateVal(val) {
    switch(typeof val) {
        case 'boolean':
            this.update(!val);
            break;
        case 'number':
            this.update(val + random.real(-1000, 1000));
            break;
        case 'string':
            this.update(mutateString(val));
            break;
        default:
            if (Array.isArray(val)) this.update(mutateArray(val));
            break;
    }
}

/**
 * @param val {string} a string value
 * @returns {string}
 */
function mutateString(val) {
    var arr = val.split('');
    if (random.bool(0.05)) {
        arr = arr.reverse();
    }
    if (random.bool(0.25)) {
        arr.splice(
            random.integer(1, arr.length),
            random.integer(1, arr.length));
    }
    if (random.bool(0.25)) {
        var args = [random.integer(1, arr.length), 0]
            .concat(random.string(random.integer(1, arr.length)).split(''));
        arr.splice.apply(arr, args);
    }
    val = arr.join('');
    return val;
}

/**
 * @param val {array} an array
 * @returns {array}
 */
function mutateArray(val) {
    if (random.bool(0.1)) {
        val = val.reverse();
    }
    if (random.bool(0.05)) {
        val = val.slice(random.integer(0, val.length));
    }
    if (random.bool(0.05)) {
        val = val.slice(0, random.integer(0, val.length));
    }
    return val;
}
