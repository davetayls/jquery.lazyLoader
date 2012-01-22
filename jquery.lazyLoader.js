/**
    jQuery.lazyLoader v0.3
    Dave Taylor http://the-taylors.org

    @license The MIT License (MIT)
    @preserve Copyright (c) <2011> <Dave Taylor http://the-taylors.org>
*/
/*global define,require */
(function($){
    'use strict';

    var DEFAULT_SETTINGS    = {
            imageRegex: /(jpg|gif|png)$/i,
            img: []
        },
        DATA_KEY = 'lazyLoader'
    ;

    var LazyLoader = function(element, settings) {
        this.settings = settings;
        this.element = element;
        this.$this = $(this.element);

        if (this.$this.data('img') || this.settings.imageRegex.test(this.element.href)) {
            var src = this.getSrc(this.$this.data('img') || this.element.href);
            this.addImage();
            this.src(src);
        }
    };
    LazyLoader.prototype = {
        addImage: function(){
            this.$img = $('<img alt="' + this.$this.text() + '" />');
            this.$this.before(this.$img).remove();
        },
        getSrc: function(url) {
            var windowWidth = $(window).width(),
                suffix = ''
            ;
            if ($.isFunction(this.settings.img)) {
                return this.settings.img.call(this, url, windowWidth);
            } else {
                $(this.settings.img).each(function(){
                    if (windowWidth >= this) {
                        suffix = '-' + this;
                    }
                });
                return url.replace(/.(jpg|gif|png)$/i, suffix + '.$1'); 
            }
        },
        src: function(url){
            this.$img.attr('src', url);
        }
    };

    $.fn.lazyLoader = function(options) {
        return this.each(function(){
            var settings = $.extend({}, DEFAULT_SETTINGS, options);
            $(this).data(DATA_KEY, new LazyLoader(this, settings));
        });
    };

}(window.jQuery));
