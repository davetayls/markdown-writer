/*global define, require, Showdown */
define(
[
    'jquery',
    'underscore',
    'backbone'
],
function($, _, Backbone){
    'use strict';

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
            var bodyVal = this.$textarea.val();
            this.$body.html(
                this.converter.makeHtml(bodyVal)
            );
            this.model.save({
                body: bodyVal,
                silent: true
            });
        }
    });
});

