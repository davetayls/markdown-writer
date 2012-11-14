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
    className: '',
    keep: true,
    initialize: function(){
      this.collection.bind('add', this.render, this);
    },
    beforeRender: function(){
      this.collection.each(function(article){
        this.insertView(new Views.ListItem({
          model: article
        }));
      }, this);
    }
  });

  Views.ListItem = Backbone.View.extend({
    tagName: 'li',
    template: 'article/list',
    events: {
      'click [name="delete"]': 'delete'
    },
    initialize: function(){
      this.model.on('change', this.render, this);
    },
    serialize: function() {
      return this.model.toJSON();
    },
    delete: function(){
      this.model.destroy();
    }
  });

  Views.NewArticle = Backbone.View.extend({
    tagName: 'div',
    template: 'article/newArticle',
    events: {
      "submit form": "create"
    },
    create: function(e){
      this.collection.create({
        title: this.$el.find('[name="title"]').val()
      });
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
      var bodyVal = articlebody.getYaml(this.$el.val());
      this.model.set('title', bodyVal.yaml.title);
      this.model.set('body', this.$el.val());
      this.model.save();
    }
  });

  Views.Preview = Backbone.View.extend({
    tagName: 'iframe',
    initialize: function(){
      if (!this.model){
        return;
      }
      this.model.on('change', this.updatePreview, this);
      this.converter = new Showdown.converter();
    },
    afterRender: function(){
      this.updatePreview();
    },
    updatePreview: function(){
      var $body = this.$el.contents().find('body');

      var bodyVal = articlebody.getYaml(this.model.get('body'));
      $body.html(
        this.converter.makeHtml(bodyVal.article)
      );
    }
  });


   return Views;

});