'use strict';

var path = require( 'path' );
var helpers = require( 'yeoman-generator' ).test;
var assert = require( 'yeoman-generator' ).assert;
var fs = require( 'fs-extra' );

describe( 'Presentation Generator', function() {

  var appName = 'barbara';
  var testDir = path.join( __dirname, 'tmp/' );


  beforeEach( function( done ) {
    fs.remove( testDir, function( err ) {
      if ( err ) {
        console.error( err );
      }
    } );
  } );


  /*
     File creation test
     ========================================================================== */

  before( function( done ) {
    var mockPrompt1 = {
      presentorPage: 'y',
      talkTitle: 'Foo bar baz',
      revealSettings: [ 'remote', 'multiplex' ]
    };

    helpers.run( path.join( __dirname, '../app' ) )
      .inDir( testDir )
      .withArguments( [ appName ] )
      .withPrompts( mockPrompt1 )
      .on( 'end', done );
  } );


  it( 'Create the new presentation files', function( done ) {
    var expected = [
      'config.yml',
      'index.hbs',
      'master.hbs',
      'slides/slide.md'
    ];
    assert.file( expected );
    assert.noFileContent( 'config.yml', /socket.io/g );
    done();
  } );



  /*
     Multiplex test
     ========================================================================== */
  before( function( done ) {
    var mockPrompt2 = {
      presentorPage: 'y',
      talkTitle: 'Foo bar baz',
      revealSettings: [ 'remote' ]
    };

    helpers.run( path.join( __dirname, '../app' ) )
      .inDir( testDir )
      .withArguments( [ appName ] )
      .withOptions( [ '--skip-install', '--skip-message' ] )
      .withPrompts( mockPrompt2 )
      .on( 'end', done );
  } );

  it( 'Create a presentation without multiplex if the user does not select that option', function( done ) {
    assert.fileContent( 'config.yml', /multiplex: false/g );
    done();
  } );

} );
