define([

	"backbone",

	// Application.
	"app",

	// Modules
	"modules/article"
],

function(Backbone, app, Article) {

	var articlesCollection = window.articlesCollection = new Article.Collection(),

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
			$articlesModal.modal('hide');
		},
		articles: function(){
			$articlesModal.modal();
		}
	});

	articlesCollection.fetch();

	return Router;

});
