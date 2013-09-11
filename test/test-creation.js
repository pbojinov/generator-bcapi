/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('assert');

/**
 * Regular APp Generator
 */

describe('bcapi generator scenarios', function () {

    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('bcapi:app', [
                '../../app'
            ]);
            this.app.options['skip-install'] = false;
            done();
        }.bind(this));
    });

    it('creates expected files using NO jQuery and NO bootstrap', function (done) {
        var expected = [
            '.jshintrc',
            '.editorconfig',
            'app/hello.html',
            'app/scripts/hello.js',
            'app/styles/hello.css',
            'dist/',
            'favicon.ico',
            'Gruntfile.js',
            'package.json'
        ];

        helpers.mockPrompt(this.app, {
            'name': 'hello'
        });
        this.app.options['skip-install'] = false;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });

    it('creates expected files using only jQuery', function (done) {
        var expected = [

            //hidden files
            '.jshintrc',
            '.editorconfig',

            //the app
            'app/hello.html',
            'app/scripts/hello.js',
            'app/styles/hello.css',

            //helping hand
            'favicon.ico',
            'Gruntfile.js',
            'package.json',

            //jquery
            'app/scripts/lib/jquery-1.10.2.min.js',
        ];

        helpers.mockPrompt(this.app, {
            'name': 'hello',
            'jquery': true,
            'bootstrap_style': false,
            'bootstrap_components': false
        });

        this.app.options['skip-install'] = false;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });

    it('creates expected files using jQuery and bootstrap styles', function (done) {
        var expected = [

            //hidden files
            '.jshintrc',
            '.editorconfig',

            //the app
            'app/hello.html',
            'app/scripts/hello.js',
            'app/styles/hello.css',

            //helping hand
            'favicon.ico',
            'Gruntfile.js',
            'package.json',

            //jquery
            'app/scripts/lib/jquery-1.10.2.min.js',

            //bootstrap css
            'app/styles/lib/bootstrap.css',
            'app/styles/lib/bootstrap.min.css',
            'app/styles/lib/bootstrap-theme.css',
            'app/styles/lib/bootstrap-theme.min.css',

            //bootstrap fonts
            'app/fonts/glyphicons-halflings-regular.eot',
            'app/fonts/glyphicons-halflings-regular.svg',
            'app/fonts/glyphicons-halflings-regular.ttf',
            'app/fonts/glyphicons-halflings-regular.woff'
        ];

        helpers.mockPrompt(this.app, {
            'name': 'hello',
            'jquery': true,
            'bootstrap_style': true,
            'bootstrap_components': false
        });

        this.app.options['skip-install'] = false;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });

    it('creates expected files using jQuery and bootstrap components', function (done) {
        var expected = [

            //hidden files
            '.jshintrc',
            '.editorconfig',

            //the app
            'app/hello.html',
            'app/scripts/hello.js',
            'app/styles/hello.css',

            //helping hand
            'favicon.ico',
            'Gruntfile.js',
            'package.json',

            //jquery
            'app/scripts/lib/jquery-1.10.2.min.js',

            //bootstrap js
            'app/scripts/lib/bootstrap.js',
            'app/scripts/lib/bootstrap.min.js'
        ];

        helpers.mockPrompt(this.app, {
            'name': 'hello',
            'jquery': false,
            'bootstrap_style': false,
            'bootstrap_components': true
        });

        this.app.options['skip-install'] = false;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });

    it('creates expected files using jQuery, bootstrap styles, and bootstrap components', function (done) {
        var expected = [

            //hidden files
            '.jshintrc',
            '.editorconfig',

            //the app
            'app/hello.html',
            'app/scripts/hello.js',
            'app/styles/hello.css',

            //helping hand
            'favicon.ico',
            'Gruntfile.js',
            'package.json',

            //jquery
            'app/scripts/lib/jquery-1.10.2.min.js',

            //bootstrap css
            'app/styles/lib/bootstrap.css',
            'app/styles/lib/bootstrap.min.css',
            'app/styles/lib/bootstrap-theme.css',
            'app/styles/lib/bootstrap-theme.min.css',

            //bootstrap fonts
            'app/fonts/glyphicons-halflings-regular.eot',
            'app/fonts/glyphicons-halflings-regular.svg',
            'app/fonts/glyphicons-halflings-regular.ttf',
            'app/fonts/glyphicons-halflings-regular.woff',

            //bootstrap js
            'app/scripts/lib/bootstrap.js',
            'app/scripts/lib/bootstrap.min.js'
        ];

        helpers.mockPrompt(this.app, {
            'name': 'hello',
            'jquery': false,
            'bootstrap_style': true,
            'bootstrap_components': true
        });

        this.app.options['skip-install'] = false;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });

});

/**
 * Sub-Generators
 *
 * component
 * launch
 * gadget
 */

describe('bcapi sub-generator scenarios', function () {

    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('bcapi:app', [
                '../../app'
            ]);
            this.app.options['skip-install'] = false;
            done();
        }.bind(this));
    });

    describe('component', function () {

        it('creates expected files using NO jQuery and NO bootstrap', function (done) {

            this.app = helpers.createGenerator('bcapi:component', [
                '../../component' //pass subgenerator folder here
            ], ['component']);

            var expected = [
                'app/component.html',
                'app/scripts/component.js',
                'app/styles/component.css',
            ];

            helpers.mockPrompt(this.app, {
                'jquery': false,
                'bootstrap_style': false,
                'bootstrap_components': false
            });
            this.app.options['skip-install'] = false;
            this.app.run({}, function () {
                helpers.assertFiles(expected);
                done();
            });
        });

        it('creates expected files using only jQuery', function (done) {

            this.app = helpers.createGenerator('bcapi:component', [
                '../../component' //pass subgenerator folder here
            ], ['component']);

            var expected = [
                'app/component.html',
                ['app/scripts/component.js', /jQuery/],
                'app/styles/component.css',
                'app/scripts/lib/jquery-1.10.2.min.js'
            ];

            helpers.mockPrompt(this.app, {
                'jquery': true,
                'bootstrap_style': false,
                'bootstrap_components': false
            });
            this.app.options['skip-install'] = false;
            this.app.run({}, function () {
                helpers.assertFiles(expected);
                done();
            });
        });

        it('creates expected files using jQuery and bootstrap styles', function (done) {

            this.app = helpers.createGenerator('bcapi:component', [
                '../../component' //pass subgenerator folder here
            ], ['component']);

            var expected = [
                ['app/component.html', /bootstrap.min.css/],
                ['app/scripts/component.js', /jQuery/i],
                'app/styles/component.css',
                'app/scripts/lib/jquery-1.10.2.min.js',
                //bootstrap css
                'app/styles/lib/bootstrap.css',
                'app/styles/lib/bootstrap.min.css',
                'app/styles/lib/bootstrap-theme.css',
                'app/styles/lib/bootstrap-theme.min.css',
                //bootstrap fonts
                'app/fonts/glyphicons-halflings-regular.eot',
                'app/fonts/glyphicons-halflings-regular.svg',
                'app/fonts/glyphicons-halflings-regular.ttf',
                'app/fonts/glyphicons-halflings-regular.woff'
            ];

            helpers.mockPrompt(this.app, {
                'jquery': true,
                'bootstrap_style': true,
                'bootstrap_components': false
            });
            this.app.options['skip-install'] = false;
            this.app.run({}, function () {
                helpers.assertFiles(expected);
                done();
            });
        });

        it('creates expected files using jQuery and bootstrap components', function (done) {

            this.app = helpers.createGenerator('bcapi:component', [
                '../../component' //pass subgenerator folder here
            ], ['component']);

            var expected = [
                ['app/component.html', /bootstrap.min.js/],
                ['app/scripts/component.js', /jQuery/i],
                'app/styles/component.css',
                'app/scripts/lib/jquery-1.10.2.min.js',
                //bootstrap js
                'app/scripts/lib/bootstrap.js',
                'app/scripts/lib/bootstrap.min.js'
            ];

            helpers.mockPrompt(this.app, {
                'jquery': true,
                'bootstrap_style': false,
                'bootstrap_components': true
            });
            this.app.options['skip-install'] = false;
            this.app.run({}, function () {
                helpers.assertFiles(expected);
                done();
            });
        });

    });

    describe('launch', function () {

        it('creates expected files using NO jQuery and NO bootstrap', function (done) {

            this.app = helpers.createGenerator('bcapi:launch', [
                '../../launch' //pass subgenerator folder here
            ], ['launch']);

            var expected = [
                ['app/launch.html'],
                ['app/scripts/launch.js', /helloWindow/],
                ['app/styles/launch.css'],
            ];

            helpers.mockPrompt(this.app, {
                'gadgetName': 'helloWindow',
                'jquery': false,
                'bootstrap_style': false,
                'bootstrap_components': false
            });
            this.app.options['skip-install'] = false;
            this.app.run({}, function () {
                helpers.assertFiles(expected);
                done();
            });
        });
    });

    describe('gadget', function () {

        it('creates expected files using NO jQuery and NO bootstrap', function (done) {

            this.app = helpers.createGenerator('bcapi:gadget', [
                '../../gadget' //pass subgenerator folder here
            ], ['gadget']);

            var expected = [
                'app/gadget.html',
                'app/scripts/gadget.js',
                'app/styles/gadget.css',
            ];

            helpers.mockPrompt(this.app, {
                'jquery': false,
                'bootstrap_style': false,
                'bootstrap_components': false
            });
            this.app.options['skip-install'] = false;
            this.app.run({}, function () {
                helpers.assertFiles(expected);
                done();
            });
        });
    });

});

