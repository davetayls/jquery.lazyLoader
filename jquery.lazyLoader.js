/**
    jQuery.lazyLoader v0.2
    Dave Taylor http://the-taylors.org

    @license The MIT License (MIT)
    @preserve Copyright (c) <2011> <Dave Taylor http://the-taylors.org>
*/
/*jslint browser: true, vars: true, white: true, forin: true */
/*global define,require */
(function($){
    'use strict';

    var /** @const */ DEFAULT_SETTINGS    = {
        imageRegex: /(jpg|gif|png)$/i
    };

    $.fn.lazyLoader = function(options) {
        var settings = $.extend({}, DEFAULT_SETTINGS, options);
        return this.each(function(){
            var $this = $(this);
            if ($this.data('img') || settings.imageRegex.test(this.href)) {
                var src = $this.data('img') || this.href,
                    $img = $('<img src="' + src + '" alt="' + $this.text() + '" />');
                $this.before($img).remove();
            }
        });
    };

}(window.jQuery));
