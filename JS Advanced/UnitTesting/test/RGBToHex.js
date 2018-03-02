let expect = require('chai').expect

function rgbToHexColor(red, green, blue) {
    if (!Number.isInteger(red) || (red < 0) || (red > 255))
        return undefined; // Red value is invalid
    if (!Number.isInteger(green) || (green < 0) || (green > 255))
        return undefined; // Green value is invalid
    if (!Number.isInteger(blue) || (blue < 0) || (blue > 255))
        return undefined; // Blue value is invalid
    return "#" +
        ("0" + red.toString(16).toUpperCase()).slice(-2) +
        ("0" + green.toString(16).toUpperCase()).slice(-2) +
        ("0" + blue.toString(16).toUpperCase()).slice(-2);
}


describe('Test RGB to Hex', function () {
    it('Should return undefined', function () {
        expect(rgbToHexColor()).to.be.equal(undefined)
    })

    it('Should return #928890', function () {
        expect(rgbToHexColor(146, 136, 144)).to.be.equal('#928890')
    })

    it('Should return undefined', function () {
        expect(rgbToHexColor(146, 136, 266)).to.be.equal(undefined)
    })

    it('Should return undefined', function () {
        expect(rgbToHexColor(146, 266, 242)).to.be.equal(undefined)
    })

    it('Should return undefined', function () {
        expect(rgbToHexColor(276, 136, 242)).to.be.equal(undefined)
    })

    it('Should return undefined', function () {
        expect(rgbToHexColor(-2, 136, 242)).to.be.equal(undefined)
    })

    it('Should return undefined', function () {
        expect(rgbToHexColor(32, -136, 242)).to.be.equal(undefined)
    })

    it('Should return undefined', function () {
        expect(rgbToHexColor(44, 136, -242)).to.be.equal(undefined)
    })

    it('Should return undefined', function () {
        expect(rgbToHexColor(44, 136, -242)).to.be.equal(undefined)
    })

    it('Should return undefined', function () {
        expect(rgbToHexColor(43)).to.be.equal(undefined)
    })

    it('Should return undefined', function () {
        expect(rgbToHexColor()).to.be.equal(undefined)
    })

    it('Should return undefined', function () {
        expect(rgbToHexColor('')).to.be.equal(undefined)
    })
    it('Should return #000000', function () {
        expect(rgbToHexColor(0, 0, 0)).to.be.equal('#000000')
    })
    it('Should return #FFFFFF', function () {
        expect(rgbToHexColor(255, 255, 255)).to.be.equal('#FFFFFF')
    })
})