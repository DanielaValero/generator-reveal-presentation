
'use strict';

var assert = require('yeoman-generator').assert;

describe('Presentations generator Tests', function () {
  it('Loads all the generators', function () {
    assert(require('../app') !== undefined);
   // assert(require('../slide') !== undefined);
  });
});
