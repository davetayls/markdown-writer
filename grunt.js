module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      files: [
        '<config:lint.all>',
        'less/**/*.less'
      ],
      tasks: 'watcher'
    },
    clean: ['public/prod'],
    lint: {
      all: ['grunt.js', 'public/js/**/*.js']
    },
    less: {
      compile: {
        files: {
          "public/css/core.css": "less/core.less"
        }
      }
    },
    jshint: {
      options: {
        browser: true
      }
    },
    min: {
      dist: {
        src: ['public/prod/js/main.js'],
        dest: 'public/prod/js/main.min.js'
      }
    },
    requirejs: {
      compile: {
        options: {
          //The top level directory that contains your app.
          appDir: "public",
          dir: "public/prod",
          fileExclusionRegExp: /^\.|^test|^node|^ci|^reports|^app\.build|^build|^prod|^offline.manifest/,
          findNestedDependencies: true,

          //By default, all modules are located relative to this path. If baseUrl
          //is not explicitly set, then all modules are loaded relative to
          //the directory that holds the build file.
          baseUrl: "./js",
          paths: {
              jquery     : '../lib/jquery.min',
              text       : '../lib/text',
              showdown   : '../lib/showdown/src/showdown',
              underscore : '../lib/underscore/underscore',
              backbone   : '../lib/backbone/backbone',
              backboneLocalstorage   : 'backbone-localstorage',
              'js-yaml'  : '../lib/js-yaml/js-yaml'
          },
          optimize: "none",
          optimizeCss: "none",
          inlineText: true,
          modules: [
              {
                  name: "main"
              }
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib');

  grunt.registerTask('default', 'lint clean less requirejs min');
  grunt.registerTask('watcher', 'lint less');

};