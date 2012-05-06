/*global console,define,require,describe,afterEach,beforeEach,expect,it,waitsFor,__dirname */
describe('lazyLoader', function () {

    var jsdom = require('jsdom'),
        path = require('path');

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
    it('should replace href to image with image tag', function () {
        this.window.$('#hrefLink a').lazyLoader();
        expect(this.window.$('#hrefLink img').length).toEqual(1);
    });
    it('should replace href to image with image tag', function () {
        this.window.$('#hrefData a').lazyLoader();
        expect(this.window.$('#hrefData img').length).toEqual(1);
    });
});

