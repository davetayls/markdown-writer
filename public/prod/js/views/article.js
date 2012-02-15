/*global define, require */
define(
[
    'jquery',
    'underscore',
    'backbone',
    'text!templates/article.html'
],
function($, _, Backbone, articleTemplate){
    

    return Backbone.View.extend({
        tagName: 'li',
        template: _.template(articleTemplate),
        events: {
            'click': 'show'
        },
        initialize: function(){
            this.model.bind('change', this.render, this);
        },
        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },
        show: function(e) {
            this.model.show();
            e.preventDefault();
        }
    });
});
