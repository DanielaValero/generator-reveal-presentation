'use strict';
var path = require( 'path' );
var util = require( 'util' );
var yeoman = require( 'yeoman-generator' );


var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);

  //Set the directory where the files will be written
  if ( typeof this.env.options.appPath === 'undefined' ) {
    this.env.options.appPath = 'presentations';
    this.appPath = this.env.options.appPath;
  }
};

util.inherits(Generator, yeoman.generators.NamedBase );
