/*jshint smarttabs:true */
/*global define, require */
define(function(require){
	'use strict';

	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),

		// ui elements
		$articlesModal = $('#articlesModal'),

		// routers
        MainRouter = require('routers/main'),

		// collections
		ArticleCollection = require('collections/article'),

		// views
		ArticleView = require('views/article'),
		EditArticleView = require('views/editarticle')
	;

	return Backbone.View.extend({
		el: $('#container'),
		events: {
			'keypress #title': 'createOnEnter'
		},
		initialize: function(){

			var self = this;

			this.input = $('#title');

			this.mainRouter = new MainRouter(),

			this.articles = new ArticleCollection();
			this.articleTemplate = [
				'---',
				'layout: post',
				'author: davetayls',
				'title: {{title}}',
				'categories:',
				'---'
			].join('\n');

			this.articles.bind('add', this.addOne, this);
			this.articles.bind('reset', this.addAll, this);
			this.articles.bind('show', this.showArticle, this);

			this.articles.fetch();
			if (this.articles.length === 0) {
				this.articles.create({
					title: 'First Article',
					body:  this.articleTemplate
				});
			}
			this.articles.at(0).show();

			this.mainRouter.on('route:article', function(title){});
			this.mainRouter.on('route:articles', function(){
				self.showArticlesList();
			});

		},
		addOne: function(article) {
			var view = new ArticleView({ model: article });
			$('#articles').append(view.render().el);
		},
		addAll: function() {
			this.articles.each(this.addOne);
		},
		showArticle: function(article) {
			if (this.editArticle) {
				this.editArticle.remove();
			}
			this.editArticle = new EditArticleView({
				model: article
			}).render().$el.appendTo('#showdown');
			$articlesModal.modal('hide');
		},

		/**
		 * Displays a modal window with all the
		 * articles in a list
		 */
		showArticlesList: function(){
            $articlesModal.modal();
		},
		createOnEnter: function(e) {
			var text = this.input.val();
			if (!text || e.keyCode !== 13) {
				return;
			}
			this.articles.create({
				title: text,
				body: this.articleTemplate.replace('{{title}}', text)
			});
			this.input.val('');
			e.preventDefault();
		}
	});

});
