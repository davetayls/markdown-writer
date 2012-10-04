/*global define,Store */
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

  // Create a new module.
  var Article = app.module();

  // Default model.
  Article.Model = Backbone.Model.extend({
    defaults: {
      title: "",
      body: ""
    },
    show: function() {
      this.trigger('show', this);
    }
  });

  // Default collection.
  Article.Collection = Backbone.Collection.extend({
    model: Article.Model,
    localStorage: new Store("articles")
  });

  // Default Views
  Article.Views = Views;

  // Return the module for AMD compliance.
  return Article;

});
