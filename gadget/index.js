'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var GadgetGenerator = module.exports = function GadgetGenerator(args, options, config) {
    // By calling `NamedBase` here, we get the argument to the subgenerator call
    // as `this.name`.
    yeoman.generators.NamedBase.apply(this, arguments);

    this.generatorName = this.name;
};

util.inherits(GadgetGenerator, yeoman.generators.NamedBase);

GadgetGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [
        {
            type: 'confirm',
            name: 'jquery',
            message: 'Would you like to use jquery?',
            default: true
        },
        {
            type: 'confirm',
            name: 'bootstrap_style',
            message: 'Would you like to use bootstrap 3.0 styles?',
            default: true
        },
        {
            type: 'confirm',
            name: 'bootstrap_components',
            message: 'Would you like to use bootstrap 3.0 javascript components? (jQuery is as a dependency)',
            default: true
        }
    ];

    this.prompt(prompts, function (props) {
        // These values are accessible in this project as <% blogName %>
        // `props` is an object passed in containing the response values, named in
        // accordance with the `name` property from your prompt object. So, for us:
        this.jquery = props.jquery;
        this.bootstrap_style = props.bootstrap_style;
        this.bootstrap_components = props.bootstrap_components;

        cb();
    }.bind(this));
};

GadgetGenerator.prototype.writeIndex = function writeIndex() {
   // this.indexFile = this.engine((this.read('component-template.html')), this);
    var indexPath = this.sourceRoot() + '/gadget-template.html',
        jsPath = this.sourceRoot() + '/gadget-script.js',
        cssPath = this.sourceRoot() + '/gadget-styles.css';

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

GadgetGenerator.prototype.files = function files() {

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
