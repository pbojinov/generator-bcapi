'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');

var BcapiGenerator = module.exports = function BcapiGenerator(args, options, config) {

    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {

        //Uncomment this if you want to run bower
        //this.installDependencies({ skipInstall: options['skip-install'] });

        //manually install grunt and its depedencies
        //this.npmInstall(['grunt', 'grunt-cli'], { saveDev: true });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

    this.generatorName = this.name;
};

util.inherits(BcapiGenerator, yeoman.generators.Base);

BcapiGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [
        {
            name: 'name',
            message: 'What do you want to name your project?'
        },
        {
            type: 'confirm',
            name: 'jquery',
            message: 'Would you like to use jQuery?',
            default: false
        },
        {
            type: 'confirm',
            name: 'bootstrap_style',
            message: 'Would you like to use bootstrap 3.0 styles?',
            default: false
        },
        {
            type: 'confirm',
            name: 'bootstrap_components',
            message: 'Would you like to use bootstrap 3.0 javascript components? (jQuery is as a dependency)',
            default: false
        }
    ];

    this.prompt(prompts, function (props) {
        // These values are accessible in this project as <% blogName %>
        // `props` is an object passed in containing the response values, named in
        // accordance with the `name` property from your prompt object. So, for us:
        this.name = props.name;
        this.jquery = props.jquery;
        this.bootstrap_style = props.bootstrap_style;
        this.bootstrap_components = props.bootstrap_components;
        cb();
    }.bind(this));
};

BcapiGenerator.prototype.app = function app() {
    this.mkdir('app');
    this.mkdir('app/scripts');
    this.mkdir('app/styles');
    this.mkdir('app/assets');
    this.mkdir('dist/Apps/' + _s.camelize(this.name)); //we use this to follow cap1 folder structure deployment
    this.copy('favicon.ico', 'favicon.ico');
    this.copy('_package.json', 'package.json');
    this.copy('Gruntfile.js', 'Gruntfile.js');
};

BcapiGenerator.prototype.writeIndex = function writeIndex() {

    //We use component sub generator structor as it is a generic component
    var indexPath = this.sourceRoot() + '/basic-template.html',
        jsPath = this.sourceRoot() + '/basic-script.js',
        cssPath = this.sourceRoot() + '/basic-styles.css';

    //index
    this.indexFile = this.readFileAsString(indexPath);
    this.indexFile = this.engine(this.indexFile, this);

    //js
    this.jsFile = this.readFileAsString(jsPath);
    this.jsFile = this.engine(this.jsFile, this);

    //css
    this.cssFile = this.readFileAsString(cssPath);
    this.cssFile = this.engine(this.cssFile, this);
};

BcapiGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');

    //add html component
    var fileName = this._.camelize(this.name) + '.html';
    this.write('app/' + fileName, this.indexFile);

    //add js
    var jsName = this._.camelize(this.name) + '.js';
    this.write('app/scripts/' + jsName, this.jsFile);

    //add css
    var cssName = this._.camelize(this.name) + '.css';
    this.write('app/styles/' + cssName, this.cssFile);

    //copy over libs
    if (this.jquery) {
        this.copy('jquery-1.10.2.min.js', 'app/scripts/lib/jquery-1.10.2.min.js');
    }

    /**
     * TODO
     * Shouldn't copy over files if they exist
     */
    if (this.bootstrap_style) {

        //regular css
        this.copy('bootstrap-3.0/css/bootstrap.css', 'app/styles/lib/bootstrap.css');
        this.copy('bootstrap-3.0/css/bootstrap.min.css', 'app/styles/lib/bootstrap.min.css');

        //extended theme css
        this.copy('bootstrap-3.0/css/bootstrap-theme.css', 'app/styles/lib/bootstrap-theme.css');
        this.copy('bootstrap-3.0/css/bootstrap-theme.min.css', 'app/styles/lib/bootstrap-theme.min.css');

        //fonts necessary for css glyphicons
        this.copy('bootstrap-3.0/fonts/glyphicons-halflings-regular.eot', 'app/fonts/glyphicons-halflings-regular.eot');
        this.copy('bootstrap-3.0/fonts/glyphicons-halflings-regular.svg', 'app/fonts/glyphicons-halflings-regular.svg');
        this.copy('bootstrap-3.0/fonts/glyphicons-halflings-regular.ttf', 'app/fonts/glyphicons-halflings-regular.ttf');
        this.copy('bootstrap-3.0/fonts/glyphicons-halflings-regular.woff', 'app/fonts/glyphicons-halflings-regular.woff');

        //html5 and responsive media queries polyfill for IE9 and below
        this.copy('bootstrap-3.0/assets/js/html5shiv.js', 'app/scripts/lib/html5shiv.js');
        this.copy('bootstrap-3.0/assets/js/respond.min.js', 'app/scripts/lib/respond.min.js');
    }

    if (this.bootstrap_components) {
        this.copy('bootstrap-3.0/js/bootstrap.js', 'app/scripts/lib/bootstrap.js');
        this.copy('bootstrap-3.0/js/bootstrap.min.js', 'app/scripts/lib/bootstrap.min.js');

        if (!(this.jquery)) {
            this.copy('jquery-1.10.2.min.js', 'app/scripts/lib/jquery-1.10.2.min.js');
        }
    }
};
