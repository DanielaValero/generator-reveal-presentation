'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs-extra');

describe('Presentation Generator', function() {

    var appName = 'new-presentation';
    var testDir = path.join(__dirname, '.tmp/');


    /*
       File creation test
       ========================================================================== */

    before(function(done) {
        fs.remove(testDir, function(err) {
            if (err) {
                console.error(err);
            }
        });
        var mockPrompt1 = {
            presentorPage: 'y',
            talkTitle: 'Foo bar baz',
            revealSettings: ['remote', 'multiplex']
        };

        helpers.run(path.join(__dirname, '../app'))
            .inDir(testDir)
            .withArguments([appName])
            .withPrompts(mockPrompt1)
            .on('end', done);
    });


    it('Create the new presentation files', function(done) {
        var expected = [
            'config.yml',
            'index.hbs',
            'master.hbs',
            'slides/0-slide-presentation-title.md'
        ];
        assert.file(expected);
        assert.fileContent('config.yml', /socket.io/g);
        assert.fileContent('index.hbs', /newPresentation/g);
        done();
    });
});
