'use strict';

var path = require( 'path' );
var helpers = require( 'yeoman-generator' ).test;
var assert = require( 'yeoman-generator' ).assert;
var fs = require( 'fs.extra' );

describe( 'Presentation Generator', function() {


  var appName = 'barbara';
  var testDir = path.join( __dirname, './tmp/' );


  afterEach( function( done ) {
    var testDir = path.join( __dirname, './tmp/' );
    fs.rmrf( testDir, function( err ) {
      if ( err ) {
        console.error( err );
      }
    } );
    done();
  } );


  before( function( done ) {
    var mockPrompt = {
      presentorPage: 'y',
      talkTitle: 'Foo bar baz',
      revealSettings: [ 'remote', 'multiplex' ]
    };

    helpers.run( path.join( __dirname, '../app' ) )
      .inDir( testDir )
      .withArguments( [ appName ] )
      .withOptions( [ '--skip-install', '--skip-message' ] )
      .withPrompts( mockPrompt )
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


  before( function(done) {
    var mockPrompt = {
      presentorPage: 'y',
      talkTitle: 'Foo bar baz',
      revealSettings: [ 'remote' ]
    };

    helpers.run( path.join( __dirname, '../app' ) )
      .inDir( testDir )
      .withArguments( [ appName ] )
      .withOptions( [ '--skip-install', '--skip-message' ] )
      .withPrompts( mockPrompt )
      .on( 'end', done );
  } );

  it( 'Create a presentation without multiplex if the user does not select that option', function( done ) {
    assert.fileContent( 'config.yml', /multiplex: false/g );
    done();

  } );

} );
