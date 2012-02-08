({
    //The top level directory that contains your app.
    appDir: "public",
    dir: "public/prod",
    fileExclusionRegExp: /^\.|^test|^node|^ci|^reports|^app\.build|^build/,
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
        backboneLocalstorage   : '../lib/backbone/examples/backbone-localstorage',
        'js-yaml'  : '../lib/js-yaml/js-yaml'
    },
    uglify: {
        toplevel: true,
        ascii_only: true,
        reserved_names: ['Backbone'],
        copyright: false
    },
    optimize: "none",
    optimizeCss: "standard",

    //If optimizeCss is in use, a list of of files to ignore for the @import
    //inlining. The value of this option should be a comma separated list
    //of CSS file names to ignore. The file names should match whatever
    //strings are used in the @import calls.
    cssImportIgnore: null,

    //Inlines the text for any text! dependencies, to avoid the separate
    //async XMLHttpRequest calls to load those dependencies.
    inlineText: true,

    //List the modules that will be optimized. All their immediate and deep
    //dependencies will be included in the module's file when the build is
    //done. If that module or any of its dependencies includes i18n bundles,
    //only the root bundles will be included unless the locale: section is set above.
    modules: [
        {
            name: "main"
        }
    ]
})



