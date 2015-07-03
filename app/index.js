'use strict';
var yeoman = require( 'yeoman-generator' ),
  chalk = require( 'chalk' ),
  cowsay = require( 'cowsay' ),
  util = require( 'util' ),
  path = require( 'path' ),
  s = require( "underscore.string" ),
  fs = require( 'fs' ),
  crypto = require( 'crypto' ),
  _ = require( 'lodash' );

/*
   Private functions
   ========================================================================== */

var createHash = function( secret ) {
  var cipher = crypto.createCipher( 'blowfish', secret );
  var final = cipher.final( 'hex' );
  return ( final );
};

var generateSocketKeys = function() {
  var ts = new Date().getTime();
  var rand = Math.floor( Math.random() * 9999999 );
  var secret = ts.toString() + rand.toString();
  return {
    secret: secret,
    socketId: createHash( secret )
  };
};

var prompts = [ {
  type: 'confirm',
  name: 'presentorPage',
  message: 'do you want to include a presentator independent page? (required with sockets)',
  default: false
}, {
  name: 'talkTitle',
  message: 'What is the title of your talk?',
  default: 'Default title talk'
}, {
  type: 'checkbox',
  name: 'revealSettings',
  message: 'Which of these reveal settings do you want to enable? - You can change them later in config.yml -',
  choices: [ {
    name: 'Multiplex',
    value: 'multiplex',
    checked: false
  }, {
    name: 'Speaker Notes',
    value: 'speakerNotes',
    checked: false
  }, {
    name: 'Remote control with remote.io',
    value: 'remote',
    checked: false
  }, {
    name: 'overview',
    value: 'overview',
    checked: false
  } ]
} ];

var createRevealSettingObject = function( props ) {
  var revealSettings = {};
  var multiplexKeys;
  var tempObject = {};

  props.revealSettings.map( function( current ) {
    var tempSetting = {};
    tempSetting[ current ] = true;
    revealSettings = _.merge(revealSettings, tempSetting);
  } );


  if ( revealSettings.multiplex ) {
    multiplexKeys = generateSocketKeys();
    revealSettings.multiplex = _.merge({}, revealSettings.multiplex, multiplexKeys );
  }

  return revealSettings;
}

/*
   Create the generator
   ========================================================================== */


var presentationGenerator = module.exports = function presentationGenerator( args, options, config ) {
  yeoman.generators.Base.apply( this, arguments );

  this.argument( 'appname', {
    type: String,
    required: true
  } );

  this.appname = this.appname || path.basename( process.cwd() );
  this.appname = s.camelize( s.slugify( s.humanize( this.appname ) ) );
  //Set the directory where the files will be written
  if ( typeof this.env.options.appPath === 'undefined' ) {
    this.env.options.appPath = 'presentations/' + this.appname;
    this.appPath = this.env.options.appPath;
  }

  this.destinationPath( this.appPath );
  this.option( 'skip-install', {
    desc: 'Whether dependencies should be installed',
    defaults: true,
  } );

  this.on( 'end', function() {
    this.installDependencies( {
      skipInstall: this.options[ 'skip-install' ],
      skipMessage: this.options[ 'skip-message' ],
      callback: this._buildFiles.bind( this ),
      bower: false
    } );
  } );
};


util.inherits( presentationGenerator, yeoman.generators.Base );


/*
   Add the prompts
   ========================================================================== */

/**
 * Executes the propmt of the reveal config. Please note that revealSettings will be an array
 * of strings, which will contain the strings the user has selected
 **/
presentationGenerator.prototype.askForRevealConfig = function askForRevealConfig() {
  var done = this.async();

  this.log( cowsay.say( {
    text: "Hello, You are about to create a new presentation.",
    e: "^^",
    T: "U "
  } ) );

  this.prompt( prompts, function( props ) {
    this.revealSettings = createRevealSettingObject( props );
    props.presentationName = this.appname;
    this.props = props;
    this.props.revealSettings = _.merge( {}, this.props.revealSettings, this.revealSettings );
    done();
  }.bind( this ) );
};


/*
   Write the files
   ========================================================================== */

presentationGenerator.prototype.writeFiles = function writeFiles() {
  this.config.save();

  this.template(
    this.templatePath( '_index.hbs' ),
    this.destinationPath( 'index.hbs' )
  );

  this.template(
    this.templatePath( '_config.yml' ),
    this.destinationPath( 'config.yml' )
  );
  this.template(
    this.templatePath( '_index.hbs' ),
    this.destinationPath( 'index.hbs' )
  );
  if ( this.props.presentorPage ) {
    this.template(
      this.templatePath( '_master.hbs' ),
      this.destinationPath( 'master.hbs' )
    );
  }
  this.template(
    this.templatePath( 'slides/_slide.md' ),
    this.destinationPath( 'slides/slide.md' )
  );
};


presentationGenerator.prototype._buildFiles = function _buildFiles() {
  if ( this.options[ 'skip-install' ] ) {
    this.log(
      'You have created a new presentation. To build it' +
      '\ngo to the root folder and run:' +
      '\n' +
      '\n' + chalk.yellow.bold( 'grunt build' )
    );
  } else {
    this.spawnCommand( 'grunt', [ 'build' ] );
  }
};
