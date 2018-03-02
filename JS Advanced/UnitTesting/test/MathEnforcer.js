let expect = require('chai').expect

let mathEnforcer = {
    addFive: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num + 5
    },
    subtractTen: function (num) {
        if (typeof(num) !== 'number') {
            return undefined
        }
        return num - 10
    },
    sum: function (num1, num2) {
        if (typeof(num1) !== 'number' || typeof(num2) !== 'number') {
            return undefined
        }
        return num1 + num2
    }
}

describe('Test Math Enforcer', function () {
    let calc
    beforeEach(function() {
        calc = undefined
    })
    it('Should return 10', function () {
        expect(calc = mathEnforcer.addFive(5)).to.be.equal(10)
    })

    it('Should return 5.001', function () {
        expect(calc = mathEnforcer.addFive(0.001)).to.be.equal(5.001)
    })

    it('Should return undefined', function () {
        expect(calc = mathEnforcer.addFive('')).to.be.equal(undefined)
    })

    it('Should return 0', function () {
        expect(calc = mathEnforcer.addFive(-5)).to.be.equal(0)
    })

    it('Should return -5', function () {
        expect(calc = mathEnforcer.subtractTen(5)).to.be.equal(-5)
    })

    it('Should return -9.999', function () {
        expect(calc = mathEnforcer.subtractTen(0.001)).to.be.equal(-9.999)
    })

    it('Should return undefined', function () {
        expect(calc = mathEnforcer.subtractTen('')).to.be.equal(undefined)
    })

    it('Should return -15', function () {
        expect(calc = mathEnforcer.subtractTen(-5)).to.be.equal(-15)
    })

    it('Should return 15', function () {
        expect(calc = mathEnforcer.subtractTen(25)).to.be.equal(15)
    })

    it('Should return undefined', function () {
        expect(calc = mathEnforcer.sum('', 3)).to.be.equal(undefined)
    })

    it('Should return undefined', function () {
        expect(calc = mathEnforcer.sum(5, [])).to.be.equal(undefined)
    })

    it('Should return 5', function () {
        expect(calc = mathEnforcer.sum(2, 3)).to.be.equal(5)
    })

    it('Should return 5.0002', function () {
        expect(calc = mathEnforcer.sum(2.0001, 3.0001)).to.be.equal(5.0002)
    })

    it('Should return 5', function () {
        expect(calc = mathEnforcer.sum(-5, -5)).to.be.equal(-10)
    })

    it('Should return 5', function () {
        expect(calc = mathEnforcer.sum(-5, 5)).to.be.equal(0)
    })
})