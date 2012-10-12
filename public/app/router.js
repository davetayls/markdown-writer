define([

	"backbone",

	// Application.
	"app",

	// Modules
	"modules/article"
],

function(Backbone, app, Article) {

	var articlesCollection = new Article.Collection(),
		currentArticle,

		// templates
		articleTemplate = [
			'---',
			'layout: post',
			'author: davetayls',
			'title: {{title}}',
			'categories:',
			'---'
		].join('\n'),

		// ui elements
		$articlesModal = $('#articlesModal'),
		$articles      = $('#articles'),

		// Views
		articlesListView = new Article.Views.List({ collection: articlesCollection })
	;

	articlesListView.render();
	$articles.append(articlesListView.el);

	// Defining the application router, you can attach sub routers here.
	var Router = Backbone.Router.extend({
		routes: {
			"": "index",
			"articles": "articles",
			"article/:id": "index"
		},

		index: function(id) {
			articlesCollection.fetch();
			if (articlesCollection.length === 0) {
				articlesCollection.create({
					title: 'First Article',
					body:  articleTemplate
				});
			}

			currentArticle = articlesCollection.getArticle(id);

			$articlesModal.modal('hide');
			app.useLayout("main")
			.setViews({
				'#preview': new Article.Views.Preview({
					model: currentArticle
				}),
				'#showdown': new Article.Views.Editor({
					model: currentArticle
				})
			}).render();
		},
		articles: function(){
			app.useLayout("articles")
			.setViews({
				'#articles-list': new Article.Views.List({
					collection: articlesCollection
				})
			})
			.render();
			articlesCollection.fetch();
		}
	});

	return Router;

});
