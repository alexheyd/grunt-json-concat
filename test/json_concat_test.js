'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.json_concat = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(6);

    var endpoint1Actual   = JSON.parse(grunt.file.read('tmp/endpoint1.json'));
    var endpoint1Expected = JSON.parse(grunt.file.read('test/expected/endpoint1.json'));
    var region1Actual     = JSON.parse(grunt.file.read('tmp/region1/endpoint1.json'));
    var region1Expected   = JSON.parse(grunt.file.read('test/expected/region1/endpoint1.json'));

    test.equal(endpoint1Actual.config1.prop1, endpoint1Expected.config1.prop1, 'endpoint1 config1.prop1 should match.');
    test.equal(endpoint1Actual.config1.prop2, endpoint1Expected.config1.prop2, 'endpoint1 config1.prop1 should match.');
    test.equal(endpoint1Actual.config2.prop1, endpoint1Expected.config2.prop1, 'endpoint1 config2.prop1 should match.');

    test.equal(region1Actual.config1.prop1, region1Expected.config1.prop1, 'endpoint1/region1 config1.prop1 should match.');
    test.equal(region1Actual.config1.prop2, region1Expected.config1.prop2, 'endpoint1/region1 config1.prop1 should match.');
    test.equal(region1Actual.config2.prop1, region1Expected.config2.prop1, 'endpoint1/region1 config2.prop1 should match.');

    test.done();
  }
};
