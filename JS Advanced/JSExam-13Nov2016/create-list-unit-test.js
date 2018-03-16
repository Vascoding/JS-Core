let expect = require('chai').expect

function createList() {
    let data = [];
    return {
        add: function (item) {
            data.push(item)
        },
        shiftLeft: function () {
            if (data.length > 1) {
                let first = data.shift();
                data.push(first);
            }
        },
        shiftRight: function () {
            if (data.length > 1) {
                let last = data.pop();
                data.unshift(last);
            }
        },
        swap: function (index1, index2) {
            if (!Number.isInteger(index1) || index1 < 0 || index1 >= data.length ||
                !Number.isInteger(index2) || index2 < 0 || index2 >= data.length ||
                index1 === index2) {
                return false;
            }
            let temp = data[index1];
            data[index1] = data[index2];
            data[index2] = temp;
            return true;
        },
        toString: function () {
            return data.join(", ");
        }
    };
}


describe('Test createList', function () {
    let list
    beforeEach(function () {
        list = createList()
    })

    it('Should have all functions', function () {
        expect(list.hasOwnProperty('add')).to.be.equal(true)
        expect(list.hasOwnProperty('shiftLeft')).to.be.equal(true)
        expect(list.hasOwnProperty('shiftRight')).to.be.equal(true)
        expect(list.hasOwnProperty('swap')).to.be.equal(true)
        expect(list.hasOwnProperty('toString')).to.be.equal(true)
    })

    it('Should return empty string', function () {
        expect(list.toString()).to.be.equal('')
    })

    it('Should return 3, 2, 1', function () {
        list.add(3)
        list.add(2)
        list.add(1)
        expect(list.toString()).to.be.equal('3, 2, 1')
    })
    it('Should return 3, str, , [object Object]', function () {
        list.add(3)
        list.add('str')
        list.add([])
        list.add({name: 'Pesho'})
        expect(list.toString()).to.be.equal('3, str, , [object Object]')
    })

    it('Should return 2, 1, 3', function () {
        list.add(3)
        list.add(2)
        list.add(1)
        list.shiftLeft()
        expect(list.toString()).to.be.equal('2, 1, 3')
    })

    it('Should return 1, 1, 1', function () {
        list.add(1)
        list.add(1)
        list.add(1)
        list.shiftLeft()
        expect(list.toString()).to.be.equal('1, 1, 1')
    })
    it('Should return empty string', function () {
        list.shiftLeft()
        expect(list.toString()).to.be.equal('')
    })
    it('Should return 1', function () {
        list.add(1)
        list.shiftLeft()
        expect(list.toString()).to.be.equal('1')
    })

    it('Should return 3, 1, 2', function () {
        list.add(1)
        list.add(2)
        list.add(3)
        list.shiftRight()
        expect(list.toString()).to.be.equal('3, 1, 2')
    })

    it('Should return 1', function () {
        list.add(1)
        list.shiftRight()
        expect(list.toString()).to.be.equal('1')
    })
    it('Should return empty string', function () {
        list.shiftRight()
        expect(list.toString()).to.be.equal('')
    })
    it('Should return 1, 1, 1', function () {
        list.add(1)
        list.add(1)
        list.add(1)
        list.shiftRight()
        expect(list.toString()).to.be.equal('1, 1, 1')
    })

    it('Should return 1, 2, 3', function () {
        list.add(1)
        list.add(2)
        list.add(3)
        list.shiftLeft()
        list.shiftRight()
        expect(list.toString()).to.be.equal('1, 2, 3')
    })

    it('Should return false', function () {
        list.add(3)
        list.add(2)
        list.add(3)
        expect(list.swap(-2)).to.be.equal(false)
        expect(list.toString()).to.be.equal('3, 2, 3')
        expect(list.swap(41)).to.be.equal(false)
        expect(list.toString()).to.be.equal('3, 2, 3')
        expect(list.swap(-2, 54)).to.be.equal(false)
        expect(list.toString()).to.be.equal('3, 2, 3')
        expect(list.swap(2, -2)).to.be.equal(false)
        expect(list.toString()).to.be.equal('3, 2, 3')
        expect(list.swap(-2, 2)).to.be.equal(false)
        expect(list.toString()).to.be.equal('3, 2, 3')
        expect(list.swap(2, 2)).to.be.equal(false)
        expect(list.toString()).to.be.equal('3, 2, 3')
        expect(list.swap(2, '2')).to.be.equal(false)
        expect(list.toString()).to.be.equal('3, 2, 3')
        expect(list.swap(0.5, '2')).to.be.equal(false)
        expect(list.toString()).to.be.equal('3, 2, 3')
        expect(list.swap({}, '2.2')).to.be.equal(false)
        expect(list.toString()).to.be.equal('3, 2, 3')
        expect(list.swap({}, [])).to.be.equal(false)
        expect(list.toString()).to.be.equal('3, 2, 3')
        expect(list.swap()).to.be.equal(false)
        expect(list.toString()).to.be.equal('3, 2, 3')
        expect(list.swap(0, 3)).to.be.equal(false)
        expect(list.toString()).to.be.equal('3, 2, 3')
        expect(list.swap(3, 0)).to.be.equal(false)
        expect(list.swap(0, 3.14)).to.be.equal(false)
        expect(list.toString()).to.be.equal('3, 2, 3')
        expect(list.swap(3.14, 0)).to.be.equal(false)
        expect(list.swap(0, 'pesho')).to.be.equal(false)
        expect(list.toString()).to.be.equal('3, 2, 3')
        expect(list.swap('pesho', 0)).to.be.equal(false)
        expect(list.toString()).to.be.equal('3, 2, 3')
        expect(list.swap(5,24,64,4,45453,45)).to.be.equal(false)
        expect(list.toString()).to.be.equal('3, 2, 3')
    })

    it('Should return true', function () {
        list.add(1)
        list.add(2)
        list.add(3)
        expect(list.swap(0, 2)).to.be.equal(true)
    })

    it('Should return 1, 2, 3', function () {
        list.add(1)
        list.add(2)
        list.add(3)
        expect(list.swap(0, 2)).to.be.equal(true)
        expect(list.toString()).to.be.equal('3, 2, 1')
        expect(list.swap(2, 0)).to.be.equal(true)
        expect(list.toString()).to.be.equal('1, 2, 3')
    })

    it('Should return 2, 1, 3', function () {
        list.add(1)
        list.add(2)
        list.add(3)
        list.swap(0, 2)
        list.shiftLeft()
        expect(list.toString()).to.be.equal('2, 1, 3')
    })

    it('Should be of string type', function () {
        list.add(1)
        list.add(2)
        list.add(3)
        expect(typeof list.toString()).to.be.equal('string')
    })
})