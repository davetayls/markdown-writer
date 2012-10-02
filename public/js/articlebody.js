/*jshint node:true */
/*global define, require, jsyaml, Showdown */
define(['yaml', 'showdown'], function(){
    'use strict';

    var converter = new Showdown.converter();

    return {
        getYaml: function(body) {
            var parts = (/(.*---\n((.*\n)*).*---\n?)?((.*\n*)*)?/mg).exec(body),
                yaml = parts && parts[2] ? parts[2] : '',
                article = parts && parts[4] ? parts[4] : ''
            ;
            return {
                all: body,
                yaml: jsyaml.load(yaml),
                article: article
            };
        },
        makeHtml: function(markdown){
            return converter.makeHtml(markdown);
        }
    };
});
