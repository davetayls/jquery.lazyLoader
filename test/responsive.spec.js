/*global spyOn,console,define,require,describe,afterEach,beforeEach,expect,it,waitsFor,__dirname */
describe('responsive images', function () {

    var jsdom = require('jsdom'),
        path = require('path'),
        $;

    beforeEach(function () {
        var self = this;
        jsdom.env('./test/SpecRunner.html', [
            path.join(__dirname, '../lib/jquery-1.7.2.min.js'),
            path.join(__dirname, '../jquery.lazyLoader.js')
        ], function(errors, window){
            if (errors) {
                console.log(errors);
            } else {
                self.window = window;
            }
        });
        waitsFor(function(){
            return typeof self.window === 'object';
        }, 'never got jsdom window', 1000);
    });

    // tests to confirm set up is ok
    it('should have a global window object', function() {
        expect(this.window).toBeDefined();
    });
    it('should have a global jQuery object', function() {
        expect(this.window.$).toBeDefined();
        expect(this.window.$.fn).toBeDefined();
    });
    it('should have the lazyLoader plugin added', function() {
        expect(this.window.$.fn.lazyLoader).toBeDefined();
    });
    
    // tests for the responsive functionality
    it('should use 768 image on tablet', function () {
        var $ = this.window.$,
            $tablet = $('#tablet'),
            $links = $tablet.find('a')
        ;
        spyOn($.fn, 'width').andReturn(768);
        expect($(this.window).width()).toBe(768);
        $links.lazyLoader({
            steps: [768,990]
        });
        expect($tablet.find('img').length).toBe(1);
        expect($tablet.find('img').attr('src')).toBe('test/myimage-768.jpg');
    });
    it('should use 990 image on desktop', function () {
        var $ = this.window.$,
            $desktop = $('#desktop'),
            $links = $desktop.find('a')
        ;
        spyOn($.fn, 'width').andReturn(990);
        expect($(this.window).width()).toBe(990);
        $links.lazyLoader({
            steps: [768,990]
        });
        expect($desktop.find('img').length).toBe(1);
        expect($desktop.find('img').attr('src')).toBe('test/myimage-990.jpg');
    });
    it('should use dynamic url function', function () {
        var $ = this.window.$,
            $container = $('#dynamic'),
            $links = $container.find('a')
        ;
        spyOn($.fn, 'width').andReturn(990);
        expect($(this.window).width()).toBe(990);
        $links.lazyLoader({
            img: function(url, windowWidth) {
                if (windowWidth >= 768){
                    return url.replace(/.(jpg|gif|png)$/i, '-mega.$1'); 
                } else {
                    return url;
                }
            }
        });
        expect($container.find('img').length).toBe(1);
        expect($container.find('img').attr('src')).toBe('test/myimage-mega.jpg');
    });
    it('should trigger a new src when window goes above step', function () {
        var $ = this.window.$,
            $container = $('#dynamic'),
            $links = $container.find('a'),
            loader,
            $img
        ;
        var spy = spyOn($.fn, 'width').andReturn(320);

        $links.lazyLoader({
            img: function(url, windowWidth) {
                if (windowWidth >= 768){
                    return url.replace(/.(jpg|gif|png)$/i, '-mega.$1'); 
                } else {
                    return url;
                }
            },
            steps: [768, 990]
        });
        $img = $container.find('img');

        expect($img.length).toBe(1);
        expect($img.attr('src')).toBe('test/myimage.jpg');

        loader = $links.data().lazyLoader;
        expect(loader.updateStep(768)).toBe(768);
        expect($img.attr('src')).toBe('test/myimage-mega.jpg');
    });
});


