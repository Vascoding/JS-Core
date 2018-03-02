let expect = require('chai').expect

function lookupChar(string, index) {
    if (typeof(string) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (string.length <= index || index < 0) {
        return "Incorrect index";
    }

    return string.charAt(index);
}

describe('Test Char Lookup', function () {
    it('Should return s', function () {
        expect(lookupChar('Pesho', 2)).to.be.equal('s')
    })

    it('Should return Incorrect index', function () {
        expect(lookupChar('Pesho', 5)).to.be.equal('Incorrect index')
    })

    it('Should return Incorrect index', function () {
        expect(lookupChar('Pesho', 123)).to.be.equal('Incorrect index')
    })

    it('Should return Incorrect index', function () {
        expect(lookupChar('Pesho', -4)).to.be.equal('Incorrect index')
    })

    it('Should return Incorrect undefined', function () {
        expect(lookupChar('Pesho', 2.6)).to.be.equal(undefined)
    })

    it('Should return undefined', function () {
        expect(lookupChar(5, -4)).to.be.equal(undefined)
    })

    it('Should return undefined', function () {
        expect(lookupChar('aaa', 'sss')).to.be.equal(undefined)
    })

    it('Should be a string type', function () {
        expect(lookupChar('str', 1)).to.be.a('string');
    })

    it('Should be of length = 1', function () {
        expect(lookupChar('str', 1)).to.be.with.length(1)
    })
})