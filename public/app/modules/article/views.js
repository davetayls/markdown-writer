define([
  "app",

  // Libs
  "backbone",
  "articlebody"
],

function(app, Backbone, articlebody) {

  var Views = {};

  Views.List = Backbone.View.extend({
    tagName: 'ul',
    initialize: function(){
      // this.collection.bind('add', this.addOne, this);
      // this.collection.bind('reset', this.addAll, this);
      // this.collection.bind('show', this.showArticle, this);
    },
    addOne: function(article) {
      var view = new Views.ListItem({ model: article });
      this.$el.append(view.render().el);
    },
    addAll: function() {
      this.collection.each(this.addOne);
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

  Views.Editor = Backbone.View.extend({
    tagName: 'textarea',
    events: {
      'keyup': 'update'
    },
    initialize: function(){
      this.$el.val(this.model.get('body'));
    },
    update: function(){
      this.model.set('body', this.$el.val());
    }
  });

  Views.Preview = Backbone.View.extend({
    tagName: 'iframe',
    initialize: function(){
      this.model.on('change', this.renderChange, this);
    },
    renderChange: function(){
      this.$body = this.$body || this.$el.contents().find('body');
      var bodyVal = articlebody.getYaml(this.model.get('body'));
      this.$body.html(articlebody.makeHtml(bodyVal.article));
    }
  });


   return Views;

});