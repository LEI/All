'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files,
      remapify = require('remapify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      server: {
        files: [
          'app.js',
          'routes/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      js: {
        files: ['game/*.js'],
        tasks: ['browserify']
      },
      browser: {
        files: ['public/scripts/*.js'],
      	options: {
      	  livereload: reloadPort
      	}
      },
      compass: {
        files: ['public/styles/**/*.{scss,sass}'],
        tasks: ['compass']
      },
      css: {
        files: ['public/styles/*.css'],
        options: {
          livereload: reloadPort
        },
        tasks: ['cssmin']
      },
      jade: {
        files: ['views/*.jade'],
        options: {
          livereload: reloadPort
        }
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'public/styles/sass',
          cssDir: 'public/styles',
          environment: 'development'
        }
      }
    },
    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      my_target: {
        src: 'node_modules/normalize.css/normalize.css',
        dest: 'public/styles/normalize.css'
      }
    },
    browserify: {
      dist: {
        files: {
      	  'public/scripts/build.js': ['game/app.js']
        }
      }
    }
  });

  grunt.config.requires('watch.server.files');
  files = grunt.config('watch.server.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function (err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded) {
            grunt.log.ok('Delayed live reload successful.');
          } else {
            grunt.log.error('Unable to make a delayed live reload.');
          }
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', ['develop', 'watch', 'compass', 'browserify', 'cssmin']);
};
