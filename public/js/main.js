/*global define,require,Showdown */
define.amd.jQuery = true;
require.config({
    paths: {
        jquery     : '../lib/jquery-amd',
        text       : '../lib/text',
        showdown   : '../lib/showdown/src/showdown',
        underscore : '../lib/underscore/underscore',
        backbone   : '../lib/backbone/backbone',
        backboneLocalstorage   : 'backbone-localstorage',
        'js-yaml'  : '../lib/js-yaml/js-yaml'
    }
});

require(
[
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'showdown'
],
function($, _, Backbone) {
    'use strict';

    var $showdown = $('#showdown'),
        $preview  = $('#preview iframe'),
        $body     = $preview.contents().find('body'),

        converter = new Showdown.converter()
    ;

    $('.dropdown-toggle').dropdown();

    require(['views/app'], function(AppView){

        var app = new AppView();
        Backbone.history.start();

    });



});
