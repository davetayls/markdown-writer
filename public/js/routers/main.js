/*global define, require, Showdown */
define(
[
    'jquery',
    'underscore',
    'backbone'
],
function($, _, Backbone){
    'use strict';

    return Backbone.Router.extend({
        routes: {
            "article/:title": "article"
        }
    });
});


