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
        backbone   : '../lib/backbone/backbone',
        underscore : '../lib/underscore/underscore'
    } 
}, 
[ 
    'jquery',
    'showdown'
], 
function($) {
    'use strict';

    var $textarea = $('#showdown textarea'),
        $preview  = $('#preview iframe'),
        $body     = $preview.contents().find('body'),

        converter = new Showdown.converter()
    ;

    $textarea.focus(function(){
        var $this = $(this);
        $this.keyup(function(){
            $body.html(
                converter.makeHtml($this.val())
            );
        });
    });

});
