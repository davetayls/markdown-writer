
module.exports = function(grunt) {

  grunt.initConfig({

    clean: ["public/dist/"],
    lint: {
      files: [
        "build/config.js", "public/app/**/*.js"
      ]
    },
    jshint: {
      options: {
        scripturl: true
      }
    },

    // The jst task compiles all application templates into JavaScript
    // functions with the underscore.js template function from 1.2.4.  You can
    // change the namespace and the template options, by reading this:
    // https://github.com/gruntjs/grunt-contrib/blob/master/docs/jst.md
    //
    // The concat task depends on this file to exist, so if you decide to
    // remove this, ensure concat is updated accordingly.
    jst: {
      "public/dist/debug/templates.js": [
        "public/app/templates/**/*.html"
      ]
    },

    // The handlebars task compiles all application templates into JavaScript
    // functions using Handlebars templating engine.
    //
    // Since this task defaults to writing to the same file as the jst task,
    // edit the debug task replacing jst with handlebars.
    //
    // The concat task depends on this file to exist, so if you decide to
    // remove this, ensure concat is updated accordingly.
    handlebars: {
      "public/dist/debug/templates.js": ["app/templates/**/*.html"]
    },

    // The concatenate task is used here to merge the almond require/define
    // shim and the templates into the application code.  It's named
    // dist/debug/require.js, because we want to only load one script file in
    // index.html.
    concat: {
      dist: {
        src: [
          "public/assets/js/libs/almond.js",
          "public/dist/debug/templates.js",
          "public/dist/debug/require.js"
        ],

        dest: "public/dist/debug/require.js",

        separator: ";"
      }
    },

    // This task uses the MinCSS Node.js project to take all your CSS files in
    // order and concatenate them into a single CSS file named index.css.  It
    // also minifies all the CSS as well.  This is named index.css, because we
    // only want to load one stylesheet in index.html.
    mincss: {
      "public/dist/release/index.css": [
        "public/dist/debug/index.css"
      ]
    },

    less: {
      development: {
        options: {
          paths: [
            "less",
            "public/lib"
          ]
        },
        files: {
          "public/css/core.css": "less/core.less"
        }
      },
      production: {
        options: {
          paths: ["less", "public/lib"],
          yuicompress: true
        },
        files: {
          "public/css/core.css": "less/core.less"
        }
      }
    },

    // The stylus task is used to compile Stylus stylesheets into a single
    // CSS file for debug and release deployments.
    stylus: {
      // Put all your CSS files here, order matters!
      files: [
        "public/assets/vendor/h5bp/css/style.css"
      ],

      // Default task which runs in debug mode, this will build out to the
      // `dist/debug` directory.
      compile: {
        // Used for @imports.
        options: { paths: ["public/assets/css"] },

        files: {
          "public/dist/debug/index.css": "<config:stylus.files>"
        }
      },

      // This dev task only runs with `watch:stylus` this will *completely*
      // overwrite the `assets/css/index.css` file referenced in `index.html`.
      // Use this only when you cannot use the `bbb server` runtime
      // compilation.
      dev: {
        // Used for @imports.
        options: { paths: ["public/assets/css"] },

        files: {
          "public/assets/css/index.css": "<config:stylus.files>"
        }
      }
    },

    // Takes the built require.js file and minifies it for filesize benefits.
    min: {
      "public/dist/release/require.js": [
        "public/dist/debug/require.js"
      ]
    },

    // Running the server without specifying an action will run the defaults,
    // port: 8000 and host: 127.0.0.1.  If you would like to change these
    // defaults, simply add in the properties `port` and `host` respectively.
    // Alternatively you can omit the port and host properties and the server
    // task will instead default to process.env.PORT or process.env.HOST.
    //
    // Changing the defaults might look something like this:
    //
    // server: {
    //   host: "127.0.0.1", port: 9001
    //   debug: { ... can set host and port here too ...
    //  }
    //
    //  To learn more about using the server task, please refer to the code
    //  until documentation has been written.
    server: {
      // Ensure the favicon is mapped correctly.
      files: { "favicon.ico": "favicon.ico" },

      debug: {
        // Ensure the favicon is mapped correctly.
        files: { "favicon.ico": "favicon.ico" },

        // Map `server:debug` to `debug` folders.
        folders: {
          "app": "dist/debug",
          "assets/js/libs": "dist/debug",
          "assets/css": "dist/debug"
        }
      },

      release: {
        // This makes it easier for deploying, by defaulting to any IP.
        host: "0.0.0.0",

        // Ensure the favicon is mapped correctly.
        files: { "favicon.ico": "favicon.ico" },

        // Map `server:release` to `release` folders.
        folders: {
          "app": "dist/release",
          "assets/js/libs": "dist/release",
          "assets/css": "dist/release"
        }
      }
    },

    // This task uses James Burke's excellent r.js AMD build tool.  In the
    // future other builders may be contributed as drop-in alternatives.
    requirejs: {
      // Include the main configuration file.
      mainConfigFile: "public/app/config.js",

      // Output file.
      out: "public/dist/debug/require.js",

      // Root application module.
      name: "config",

      // Do not wrap everything in an IIFE.
      wrap: false
    },

    // The headless QUnit testing environment is provided for "free" by Grunt.
    // Simply point the configuration to your test directory.
    qunit: {
      all: ["test/qunit/*.html"]
    },

    // The headless Jasmine testing is provided by grunt-jasmine-task. Simply
    // point the configuration to your test directory.
    jasmine: {
      all: ["test/jasmine/*.html"]
    },

    // The watch task can be used to monitor the filesystem and execute
    // specific tasks when files are modified.  By default, the watch task is
    // available to compile stylus templates if you are unable to use the
    // runtime builder (use if you have a custom server, PhoneGap, Adobe Air,
    // etc.)
    watch: {
      stylus: {
        files: ["grunt.js", "less/**/*.less"],
        tasks: "less:development"
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib');

  // The debug task will remove all contents inside the dist/ folder, lint
  // all your code, precompile all the underscore templates into
  // dist/debug/templates.js, compile all the application code into
  // dist/debug/require.js, and then concatenate the require/define shim
  // almond.js and dist/debug/templates.js into the require.js file.
  grunt.registerTask("debug", "clean lint jst requirejs concat less");

  // The release task will run the debug tasks and then minify the
  // dist/debug/require.js file and CSS files.
  grunt.registerTask("release", "debug min mincss");

};

