/*jslint browser: true, vars: true, white: true, forin: true, nomen: true, sloppy: true */
/*global define,require,describe,afterEach,beforeEach,expect,it,waitsFor */
describe('lazyLoader', function () {

    it('should replace href to image with image tag', function () {
        $('#hrefLink a').lazyLoader();
        expect($('#hrefLink img').length).toEqual(1);
    });
    it('should replace href to image with image tag', function () {
        $('#hrefData a').lazyLoader();
        expect($('#hrefData img').length).toEqual(1);
    });
});

