let expect = require('chai').expect

function sum(arr) {
    let sum = 0;
    for (num of arr)
        sum += Number(num);
    return sum;
}

describe('Is Sum', function () {
    it('Should sum correctly', function () {
        expect(sum([1, 2])).to.be.equal(3)
    })

    it('Should return empty array', function () {
        expect(sum([])).to.be.equal(0)
    })

    it("should return 1 for [1]", function() {
        expect(sum([1])).to.be.equal(1);
    })
})