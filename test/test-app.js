'use strict';

var path = require( 'path' );
var fs = require( 'fs' );
var helpers = require( 'yeoman-generator' ).test;
var assert = require( 'yeoman-generator' ).assert;


describe( 'Presentation Generator', function() {
  var appName = 'barbara';

  beforeEach( function( done ) {


    var mockPrompt = {
      presentorPage: 'y',
      talkTitle: 'Foo bar baz',
      revealSettings: [ {
        multiplex: true
      }, {
        remote: false
      } ]
    };

    var testDir = path.join( __dirname, './tmp/')

    helpers.run( path.join( __dirname, '../app' ) )
      .inDir( testDir )
      .withArguments( [ appName ] )
      .withOptions(['--skip-install', '--skip-message'])
      .withPrompts( mockPrompt )
      .on( 'end', function () {
        done();
      } );
  } );

  it( 'Create the new presentation files', function( done ) {
    var expected = [
      'config.yml',
      'index.hbs',
      'master.hbs',
      'slides/slide.md'
    ];
    assert.file( expected );
    done();
  } );
} );
