/*global define, require, Showdown, jsyaml */
define(
[
    'jquery',
    'underscore',
    'backbone',
    'articlebody'
],
function($, _, Backbone, articlebody){
    

    return Backbone.View.extend({
        tagName: 'div',
        template: '<textarea></textarea>',
        events: {
            'keyup textarea': 'preview'
        },
        initialize: function(){
            this.$el.html(this.template);
            this.$textarea = this.$('textarea');
            this.$preview  = $('#preview iframe');
            this.$body     = this.$preview.contents().find('body');
            this.converter = new Showdown.converter();

            this.model.on('change', this.render, this);
        },
        render: function() {
            this.$textarea.val(this.model.get('body'));
            this.preview();
            return this;
        },
        preview: function() {
            var bodyVal = articlebody.getYaml(this.$textarea.val());
            this.$body.html(
                this.converter.makeHtml(bodyVal.article)
            );
            this.model.save({
                title: bodyVal.yaml && bodyVal.yaml.title ? bodyVal.yaml.title : this.model.get('title'),
                body: bodyVal.all,
                silent: true
            });
        }
    });
});

