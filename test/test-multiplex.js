'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs-extra');

describe('Multiplex Test', function() {
    var appName = 'barbara';
    var testDir = path.join(__dirname, '.tmp/');

    before(function(done) {
        fs.remove(testDir, function(err) {
            if (err) {
                console.error(err);
            }
        });

        var mockPrompt2 = {
            presentorPage: 'y',
            talkTitle: 'Foo bar baz',
            revealSettings: ['remote']
        };

        helpers.run(path.join(__dirname, '../app'))
            .inDir(testDir)
            .withArguments([appName])
            .withOptions(['--skip-install', '--skip-message'])
            .withPrompts(mockPrompt2)
            .on('end', done);
    });

    it('Create a presentation without multiplex if the user does not select that option', function(done) {
        assert.fileContent('config.yml', /multiplex: false/g);
        done();
    });

});
