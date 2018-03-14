let expect = require('chai').expect

class Sumator {
    constructor() {
        this.data = [];
    }
    add(item) {
        this.data.push(item);
    }
    sumNums() {
        let sum = 0;
        for (let item of this.data)
            if (typeof (item) === 'number')
                sum += item;
        return sum;
    }
    removeByFilter(filterFunc) {
        this.data = this.data.filter(x => !filterFunc(x));
    }
    toString() {
        if (this.data.length > 0)
            return this.data.join(", ");
        else
            return '(empty)';
    }
}


describe('Test Sumator Class', function () {
    let sumator
    beforeEach(function () {
        sumator = new Sumator()
    })

    it('Should return empty array', function () {
        expect(sumator.data.length).to.be.equal(0)
    })

    it('Should return empty array', function () {
        expect(Sumator.prototype.hasOwnProperty('add')).to.be.equal(true)
        expect(Sumator.prototype.hasOwnProperty('sumNums')).to.be.equal(true)
        expect(Sumator.prototype.hasOwnProperty('removeByFilter')).to.be.equal(true)
        expect(Sumator.prototype.hasOwnProperty('toString')).to.be.equal(true)
    })

    it('Should return empty array', function () {
        expect(sumator.toString()).to.be.equal('(empty)')
    })
    it('Should add correctly', function () {
        sumator.add(2)
        sumator.add('str')
        sumator.add({name: 'Pesho'})
        sumator.add([5, 5])
        expect(sumator.data[0]).to.be.equal(2)
        expect(sumator.data[1]).to.be.equal('str')
        expect(sumator.data[2]['name']).to.be.equal('Pesho')
        expect(sumator.data[3].toString()).to.be.equal('5,5')
    })

    it('Should add correctly', function () {
        sumator.add(null)

        expect(sumator.toString()).to.be.equal('')
    })

    it('Should add correctly', function () {
        sumator.add(undefined)

        expect(sumator.toString()).to.be.equal('')
    })

    it('Should add correctly', function () {
        sumator.add(new Map())

        expect(sumator.toString()).to.be.equal('[object Map]')
    })
    it('Should sum correctly', function () {
        sumator.add(2)
        sumator.add('str')
        sumator.add(5)
        sumator.add({age: 15})
        expect(sumator.sumNums()).to.be.equal(7)
    })
    it('Should sum correctly', function () {
        sumator.add('str')
        sumator.add({age: 15})
        expect(sumator.sumNums()).to.be.equal(0)
    })

    it('Should sum correctly', function () {
        sumator.add(1)
        sumator.add(2)
        sumator.add(3)
        sumator.add(4)
        sumator.removeByFilter(x => x % 2 === 0)
        expect(sumator.toString()).to.be.equal('1, 3')
    })

    it('Should sum correctly', function () {
        sumator.add(1)

        sumator.removeByFilter(x => x !== 2)
        expect(sumator.toString()).to.be.equal('(empty)')
    })

    it('Should sum correctly', function () {
        sumator.add(1)
        sumator.add(2)
        sumator.add(3)
        sumator.add(4)

        expect(() => sumator.removeByFilter()).to.throw()
    })

    it('Should sum correctly', function () {

        expect(sumator.toString()).to.be.equal('(empty)')
    })
})