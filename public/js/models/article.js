/*global define, require */
define(
[
    'jquery',
    'underscore',
    'backbone'
],
function($, _, Backbone){
    'use strict';

    var Article = Backbone.Model.extend({
        defaults: {
            title: "",
            body: ""
        },
        initialize: function(){
        },
        show: function() {
            this.trigger('show', this);
        }
    });
    return Article;
});
