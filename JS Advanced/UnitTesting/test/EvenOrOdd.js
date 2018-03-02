let expect = require('chai').expect

function isOddOrEven(string) {
    if (typeof(string) !== 'string') {
        return undefined
    }
    if (string.length % 2 === 0) {
        return "even"
    }

    return "odd"
}


describe('Test Even Or Odd', function () {
    it('Should return undefined', function () {
        expect(isOddOrEven([1, 2])).to.be.equal(undefined)
    })

    it('Should return odd', function () {
        expect(isOddOrEven('oddString')).to.be.equal('odd')
    })

    it('Should return even', function () {
        expect(isOddOrEven('evenString')).to.be.equal('even')
    })
})