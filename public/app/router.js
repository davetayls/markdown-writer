define([

	"backbone",

	// Application.
	"app",

	// Modules
	"modules/article"
],

function(Backbone, app, Article) {

	var articlesCollection = window.articlesCollection = new Article.Collection(),
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
			"articles": "articles"
		},

		index: function() {
			articlesCollection.fetch();
			window.a = currentArticle = articlesCollection.at(0);
			currentArticle.on('change', function(){ console.log('hhhh'); });

			if (articlesCollection.length === 0) {
				articlesCollection.create({
					title: 'First Article',
					body:  articleTemplate
				});
			}

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
			.render();
		}
	});


	return Router;

});
