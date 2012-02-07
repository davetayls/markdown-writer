/*jshint node:true */
/*global define, require, jsyaml */
define(['js-yaml'], function(){
    'use strict';

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
        }
    };
});
