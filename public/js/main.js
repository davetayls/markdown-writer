/**
* Main
* ====
* This is the main js initialiser for the page
* it is triggered by the data-main attribute on the
* require script tag.
* <script data-main="/js/main" src="/lib/require.js"></script>
* for more information see <http://requirejs.org>
*/
/*global define,require,Showdown */
define.amd.jQuery = true;
require(
{ 
    paths: { 
        jquery     : '../lib/jquery.min',
        text       : '../lib/text',
        showdown   : '../lib/showdown/src/showdown',
        underscore : '../lib/underscore/underscore',
        backbone   : '../lib/backbone/backbone',
        backboneLocalstorage   : '../lib/backbone/examples/backbone-localstorage',
    } 
}, 
[ 
    'jquery',
    'underscore',
    'backbone',
    'showdown'
], 
function($, _, Backbone) {
    'use strict';

    var $showdown = $('#showdown'),
        $preview  = $('#preview iframe'),
        $body     = $preview.contents().find('body'),

        converter = new Showdown.converter()
    ;

    require(
    [
        'routers/main',
        'collections/article',
        'views/article',
        'views/fullarticle'
    ], 
    function(MainRouter, ArticleCollection, ArticleView, FullArticleView){

        var articles = new ArticleCollection(),
            fullArticle
        ;

        var AppView = Backbone.View.extend({
            el: $('#main'),
            events: {
                'keypress #title': 'createOnEnter'
            },
            initialize: function(){
                this.input = $('#title');

                articles.bind('add', this.addOne, this);
                articles.bind('reset', this.addAll, this);
                articles.bind('show', this.showArticle, this);

                articles.fetch();
                if (articles.length === 0) {
                    articles.create({
                        title: 'dummy title',
                        body:  'dummy body'
                    });
                }
                articles.at(0).show();
            },
            addOne: function(article) {
                var view = new ArticleView({ model: article });
                $('#articles').append(view.render().el);
            },
            addAll: function() {
                articles.each(this.addOne);
            },
            showArticle: function(article) {
                if (fullArticle) {
                    fullArticle.remove();
                }
                fullArticle = new FullArticleView({ 
                    model: article
                }).render().$el.appendTo('#showdown');
            },
            createOnEnter: function(e) {
                var text = this.input.val();
                if (!text || e.keyCode !== 13) {
                    return;
                }
                articles.create({
                    title: text
                });
                this.input.val('');
                e.preventDefault();
            }
        });

        var app = new AppView(),
            mainRoute = new MainRouter()
        ;
        Backbone.history.start();

        mainRoute.on('route:article', function(title){
        });

    });



});
