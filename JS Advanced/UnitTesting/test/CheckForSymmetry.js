let expect = require('chai').expect

function isSymmetric(arr) {
    if (!Array.isArray(arr))
        return false; // Non-arrays are non-symmetric
    let reversed = arr.slice(0).reverse(); // Clone and reverse
    let equal = (JSON.stringify(arr) == JSON.stringify(reversed));
    return equal;
}


describe('Test symmetric', function () {
    it('Should return false', function () {
        expect(isSymmetric([1, 2])).to.be.equal(false)
    })

    it('Should return true', function () {
        expect(isSymmetric([1, 2, 1])).to.be.equal(true)
    })

    it('Should return true', function () {
        expect(isSymmetric([])).to.be.equal(true)
    })

    it('Should return false', function () {
        expect(isSymmetric()).to.be.equal(false)
    })

    it('Should return false', function () {
        expect(isSymmetric(100)).to.be.equal(false)
    })

    it('Should return false', function () {
        expect(isSymmetric('')).to.be.equal(false)
    })

    it('Should return false', function () {
        expect(isSymmetric('str', 5)).to.be.equal(false)
    })

    it('Should return false', function () {
        expect(isSymmetric([5,'hi',{a:5},new Date(),{a:5},'hi',5])).to.be.equal(true)
    })
    it('Should return false', function () {
        expect(isSymmetric([5,'hi',{a:5},new Date(),{X:5},'hi',5])).to.be.equal(false)
    })
})