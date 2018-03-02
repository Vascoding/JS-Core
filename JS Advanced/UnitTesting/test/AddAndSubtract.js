let expect = require('chai').expect

function createCalculator() {
    let value = 0;
    return {
        add: function(num) { value += Number(num); },
        subtract: function(num) { value -= Number(num); },
        get: function() { return value; }
    }
}


describe('Test Add and Subtract', function () {
    let calc
    beforeEach(function() {
        calc = createCalculator();
    })

    it('Should return 5', function () {
        calc.add(5)
        let num = calc.get()
        expect(num).to.be.equal(5)
    })

    it('Should return -5', function () {
        calc.subtract(5)
        let num = calc.get()
        expect(num).to.be.equal(-5)
    })

    it('should return 5', () => {
        calc.add("5");
        let value = calc.get();
        expect(value).to.equal(5);
    });

    it('Should return 0', function () {
        let num = calc.get()
        expect(num).to.be.equal(0)
    })

    it('Should return Nan', function () {
        calc.add(5)
        calc.add('str')
        let num = calc.get()
        expect(num).to.be.NaN
    })

    it('Should return 0', function () {
        calc.add(5)
        calc.add(-5)
        let num = calc.get()
        expect(num).to.be.equal(0)
    })

    it('Should return 1e+23', function () {
        calc.add(99999999999999999999999)

        let num = calc.get()
        expect(num).to.be.equal(1e+23)
    })

    it('Has add', function () {
        expect(calc).haveOwnProperty('add')
    })

    it('Has subtract', function () {
        expect(calc).haveOwnProperty('subtract')
    })

    it('Has ', function () {
        expect(calc).haveOwnProperty('get')
    })
})