describe('lazyLoader', function () {

    it('should replace href to image with image tag', function () {
        $('#hrefLink').lazyLoader();
        expect($('#hrefLink img').length).toEqual(1);
    });
    it('should replace href to image with image tag', function () {
        $('#hrefData').lazyLoader();
        expect($('#hrefData img').length).toEqual(1);
    });
});

