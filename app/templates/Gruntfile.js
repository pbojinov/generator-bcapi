// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

var semver = require('semver');

module.exports = function (grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                all: [
                    'app/scripts/*js',
                    'dist/scripts/*.js'
                ]
            }
        },
        concat: {
            js: {
                //jquery first, then bootstrap, then our app code
                src: ['app/scripts/lib/html5shiv.js', 'app/scripts/lib/respond.min.js', 'app/scripts/lib/jquery-1.10.2.min.js', 'app/scripts/lib/bootstrap.min.js', 'app/scripts/*.js'],
                dest: 'dist/Apps/<%= _.camelize(name) %>/scripts/<%= _.camelize(name) %>-v<%= pkg.version %>.js',
                options: {
                    separator: ';'
                }
            },
            css: {
                src: ['app/styles/lib/*.css', 'app/styles/*.css'],
                dest: 'dist/Apps/<%= _.camelize(name) %>/styles/<%= _.camelize(name) %>-v<%= pkg.version %>.css',
                options: {
                    separator: ' '
                }
            }
        },
        uglify: {
            options: {
                mangle: false,
                preserveComments: false,
                beautify: false,
                compress: false
            },
            my_target: {
                files: {
                    'dist/Apps/<%= _.camelize(name) %>/scripts/<%= _.camelize(name) %>-v<%= pkg.version %>.min.js': 'dist/Apps/<%= _.camelize(name) %>/scripts/<%= _.camelize(name) %>-v<%= pkg.version %>.js' //destination:source
                }
            }
        },
        cssmin: {
            css:{
                src: 'dist/Apps/<%= _.camelize(name) %>/styles/<%= _.camelize(name) %>-v<%= pkg.version %>.css',
                dest: 'dist/Apps/<%= _.camelize(name) %>/styles/<%= _.camelize(name) %>-v<%= pkg.version %>.min.css'
            }
        },
        copy: {
            main: {
                src: ['app/*.html', 'app/favicon.ico', 'app/assets', 'app/fonts'], //dont forget bootstrap dependencies, fonts, images, etc
                dest: 'dist/Apps/<%= _.camelize(name) %>/',
                flatten: true,
                expand: true,
                filter: 'isFile'
            }
        },
        htmlrefs: {
            dist: {
                src: 'dist/Apps/<%= _.camelize(name) %>/*.html',
                dest: 'dist/Apps/<%= _.camelize(name) %>/'
            }
        },
        // gzip assets 1-to-1 for production
        compress: {
            main: {
                options: {
                    archive : 'Apps.tar.gz',
                    mode: 'tgz',
                    pretty: true
                },
                expand: true,
                cwd: 'dist/Apps/',
                src: ['**/*']
            }
        }
    });

    grunt.registerTask('bump', 'bump manifest version', function (type) {
        var options = this.options({
            file: grunt.config('pkgFile') || 'package.json'
        });

        function setup(file, type) {
            var pkg = grunt.file.readJSON(file);
            var newVersion = pkg.version = semver.inc(pkg.version, type || 'patch');
            return {
                file: file,
                pkg: pkg,
                newVersion: newVersion
            };
        }

        var config = setup(options.file, type);
        grunt.file.write(config.file, JSON.stringify(config.pkg, null, '  ') + '\n');
        grunt.log.ok('Version bumped to ' + config.newVersion);
    });

    grunt.registerTask('build', 'Building your app', ['jshint', 'concat', 'uglify', 'cssmin', 'copy', 'htmlrefs', 'jshint']);
};