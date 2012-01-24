/**
    jQuery.lazyLoader v0.3
    Dave Taylor http://the-taylors.org

    @license The MIT License (MIT)
    @preserve Copyright (c) <2011> <Dave Taylor http://the-taylors.org>
*/
/*global define,require */
(function($){
    'use strict';

    var $window = $(window),
        lastResize,
        throttleTimeout = 1000 / 60,

        DEFAULT_SETTINGS    = {
            imageRegex: /(jpg|gif|png)$/i,
            img: [],
            steps: []
        },
        DATA_KEY = 'lazyLoader'
    ;

    var LazyLoader = function(element, settings) {
        this.settings = settings;
        this.element = element;
        this.$this = $(this.element);

        if (this.$this.data('img') || this.settings.imageRegex.test(this.element.href)) {
            this.originalSrc = this.$this.data('img') || this.element.href;
            this.addImage();
            this.src(this.getSrc(this.originalSrc));
        }
    };
    LazyLoader.prototype = {
        originalSrc: '',
        currentStep: 0,
        addImage: function(){
            this.$img = $('<img alt="' + this.$this.text() + '" />');
            this.$this.before(this.$img).remove();
        },
        getSrc: function(url, winWidth) {
            var windowWidth = winWidth || $window.width(),
                suffix = ''
            ;
            if ($.isFunction(this.settings.img)) {
                return this.settings.img.call(this, url, windowWidth);
            } else if (this.settings.steps.length) {
                $(this.settings.steps).each(function(){
                    if (windowWidth >= this) {
                        suffix = '-' + this;
                    }
                });
                return url.replace(/.(jpg|gif|png)$/i, suffix + '.$1'); 
            }
        },
        src: function(url){
            this.$img.attr('src', url);
        },
        updateStep: function(windowWidth) {
            var step,
                ln = this.settings.steps.length, i, itm;
            for (i = 0; i < ln; i+=1) {
                if (windowWidth >= this.settings.steps[i]) {
                    step = this.settings.steps[i];
                }
            }
            if (step && step !== this.currentStep) {
                this.currentStep = step;
                this.src(this.getSrc(this.originalSrc, windowWidth));
            }
            return step;
        }
    };

    $window.resize(function(e){
        if (!lastResize || new Date() > new Date(lastResize.getTime() + throttleTimeout)) {
            var ln = $.lazyLoader.all.length, i, itm,
                windowWidth = $window.width();
            for (i = 0; i < ln; i+=1) {
                $.lazyLoader.all[i].updateStep(windowWidth);
            }
        }
    });

    $.lazyLoader = {
        all: [] // a holder for all the LazyLoaders
    };

    $.fn.lazyLoader = function(options) {
        return this.each(function(){
            var settings = $.extend({}, DEFAULT_SETTINGS, options),
                loader = new LazyLoader(this, settings);
            $(this).data(DATA_KEY, loader);
            $.lazyLoader.all.push(loader);
        });
    };

}(window.jQuery));
