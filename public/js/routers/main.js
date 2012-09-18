/*global define, console, require, Showdown */
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
			"articles": "articles",
			"article/:title": "article"
		}
	});
});


