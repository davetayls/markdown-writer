define([
  "app",

  // Libs
  "backbone"
],

function(app, Backbone) {

  var Views = {};

  Views.List = Backbone.View.extend({
    tagName: 'ul',
    // Insert all subViews prior to rendering the View.
    beforeRender: function() {
      // Iterate over the passed collection and create a view for each item.
      this.collection.each(function(model) {
        this.insertView(new Views.ListItem(model));
      }, this);
    }
  });

  Views.ListItem = Backbone.View.extend({
    tagName: 'li',
    template: 'article/list',
    events: {
      'click': 'show'
    },
    initialize: function(){
      this.model.bind('change', this.render, this);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    show: function(e) {
      this.model.show();
      e.preventDefault();
    }
  });


   return Views;

});