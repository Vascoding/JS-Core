let expect = require('chai').expect

let list = (function(){
    let data = [];
    return {
        add: function(item) {
            data.push(item);
        },
        delete: function(index) {
            if (Number.isInteger(index) && index >= 0 && index < data.length) {
                return data.splice(index, 1)[0];
            } else {
                return undefined;
            }
        },
        toString: function() {
            return data.join(", ");
        }
    };
})();

describe('Test List', function () {
    it('Should have functions add, delete and tostring', function () {
        expect(list.hasOwnProperty('add')).to.be.true
        expect(list.hasOwnProperty('delete')).to.be.true
        expect(list.hasOwnProperty('toString')).to.be.true
    })
    it("should be of type string", () => {
        expect(typeof list.toString()).to.equal('string')
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

    it('Should return 1', function () {
        expect(list.delete(2)).to.be.equal(1)
    })

    it('Should return 3, 2, Pesho, [object Object], 1,2,3', function () {
        list.add('Pesho')
        list.add({name: 'Gosho'})
        list.add([1, 2, 3])
        expect(list.toString()).to.be.equal('3, 2, Pesho, [object Object], 1,2,3')
    })

    it('Should return Pesho', function () {
        expect(list.delete(56)).to.be.equal(undefined)
    })

    it('Should return 3, 2, 1', function () {
        expect(list.delete(2)).to.be.equal('Pesho')
    })

    it('Should return empty string', function () {
        list.add('')
        expect(list.delete(4)).to.be.equal('')
    })

    it('Should return 3, 2, [object Object], 1,2,3, ', function () {
        list.add('')
        expect(list.toString()).to.be.equal('3, 2, [object Object], 1,2,3, ')
    })

    it('Should return undefined', function () {
        list.add(undefined)
        expect(list.delete(5)).to.be.equal(undefined)
    })

    it('Should return undefined', function () {
        list.add()
        expect(list.delete(5)).to.be.equal(undefined)
    })
    it('Should return undefined', function () {
        list.add()
        expect(list.delete(5)).to.be.equal(undefined)
    })

    it('Should return undefined', function () {
        expect(list.delete('str')).to.be.undefined
        expect(list.delete({name: 'Pesho'})).to.be.undefined
        expect(list.delete([])).to.be.undefined
        expect(list.delete(new Map())).to.be.undefined
    })

    it('Should return 3', function () {
        list.add(5)
        list.add(4.5)
        expect(list.delete(0)).to.be.equal(3)
    })
})
