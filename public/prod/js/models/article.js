/*global define, require */
define(
[
    'jquery',
    'underscore',
    'backbone'
],
function($, _, Backbone){
    

    var Article = Backbone.Model.extend({
        defaults: {
            title: "",
            body: ""
        },
        initialize: function(){
        },
        show: function() {
            this.trigger('show', this);
        }
    });
    return Article;
});
