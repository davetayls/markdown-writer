/*global define, require, Store */
define(
[
    'jquery',
    'underscore',
    'backbone',
    '../models/article',
    'backboneLocalstorage'
],
function($, _, Backbone, article){
    'use strict';

    return Backbone.Collection.extend({
        model: article,
        localStorage: new Store("articles")
    });
});
