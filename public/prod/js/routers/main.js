/*global define, require, Showdown */
define(
[
    'jquery',
    'underscore',
    'backbone'
],
function($, _, Backbone){
    

    return Backbone.Router.extend({
        routes: {
            "article/:title": "article"
        }
    });
});


