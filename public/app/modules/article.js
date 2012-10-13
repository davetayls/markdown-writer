/*global define,Store,_ */
define([
  // Application.
  "app",
  "backbone",

  // Views
  "modules/article/views",

  "plugins/backbone.localStorage",
  "articlebody"
],

// Map dependencies from above array.
function(app, Backbone, Views, articlebody) {

  // templates
  var articleTemplate = [
    '---',
    'layout: post',
    'author: davetayls',
    'title: <%= title %>',
    'categories:',
    '---\n\n'
  ].join('\n');

  // Create a new module.
  var Article = app.module();

  // Default model.
  Article.Model = Backbone.Model.extend({
    defaults: {
      title: "",
      body: ""
    },
    initialize: function(){
      this.set('body', this.get('body') || _.template(articleTemplate, {
        title: this.get('title')
      }));
    },
    show: function() {
      this.trigger('show', this);
    }
  });

  // Default collection.
  Article.Collection = Backbone.Collection.extend({
    model: Article.Model,
    localStorage: new Store("articles"),
    getArticle: function(id){
      var article = this.get(id);
      if (!article && this.length){
        article = this.at(0);
      }
      return article;
    }
  });

  // Default Views
  Article.Views = Views;

  // Return the module for AMD compliance.
  return Article;

});
