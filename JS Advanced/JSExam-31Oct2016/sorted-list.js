let expect = require('chai').expect

class SortedList {
    constructor() {
        this.list = [];
    }

    add(element) {
        this.list.push(element);
        this.sort();
    }

    remove(index) {
        this.vrfyRange(index);
        this.list.splice(index, 1);
    }

    get(index) {
        this.vrfyRange(index);
        return this.list[index];
    }

    vrfyRange(index) {
        if (this.list.length == 0) throw new Error("Collection is empty.");
        if (index < 0 || index >= this.list.length) throw new Error("Index was outside the bounds of the collection.");
    }

    sort() {
        this.list.sort((a, b) => a - b);
    }

    get size() {
        return this.list.length;
    }
}


describe('Test Sorted List', function () {
    let list
    beforeEach(function () {
        list = new SortedList()
    })

    it('Should return 0', function () {
        expect(list.list.length).to.be.equal(0)
        expect(list.size).to.be.equal(0)
    })

    it('Should return true', function () {
        expect(SortedList.prototype.hasOwnProperty('add')).to.be.equal(true)
        expect(SortedList.prototype.hasOwnProperty('remove')).to.be.equal(true)
        expect(SortedList.prototype.hasOwnProperty('get')).to.be.equal(true)
        expect(SortedList.prototype.hasOwnProperty('vrfyRange')).to.be.equal(true)
        expect(SortedList.prototype.hasOwnProperty('sort')).to.be.equal(true)
        expect(SortedList.prototype.hasOwnProperty('size')).to.be.equal(true)
    })

    it('Should return -15, 1, 4.5, 5, 6, 7', function () {
        list.add(5)
        list.add(6)
        list.add(7)
        list.add(1)
        list.add(-15)
        list.add(4.5)
        expect(list.list.toString()).to.be.equal([-15, 1, 4.5, 5, 6, 7].toString())
    })

    it('Should return str,[object Object],7,1,2,3', function () {
        list.add('str')
        list.add({name: 'Pesho'})
        list.add(7)
        list.add([1, 2, 3])
        expect(list.list.toString()).to.be.equal('str,[object Object],7,1,2,3')
    })

    it('Should throw an error', function () {
        list.add(2)
        list.add(5)
        list.add(7)
        list.add(10)
        expect(() => list.remove(-4)).to.throw(Error, 'Index was outside the bounds of the collection.')
        expect(() => list.remove(54)).to.throw(Error, 'Index was outside the bounds of the collection.')
        expect(list.remove(2.5)).to.be.equal(undefined)
    })

    it('Should throw an error', function () {
        expect(() => list.remove(2)).to.throw(Error, 'Collection is empty.')
    })

    it('Should throw an error', function () {
        list.add(2)
        list.add(5)
        list.add(7)
        list.add(10)
        list.remove(0)
        expect(list.list.length).to.be.equal(3)
        list.remove(0)
        expect(list.list.length).to.be.equal(2)
        expect(() => list.remove(65)).to.throw(Error, 'Index was outside the bounds of the collection.')
        list.remove(0)
        expect(list.list.length).to.be.equal(1)
        list.remove(0)
        expect(list.list.length).to.be.equal(0)
        expect(() => list.remove(0)).to.throw(Error, 'Collection is empty.')
    })

    it('Should throw an error', function () {
        list.add(2)
        list.add(5)
        list.add(7)
        list.add(10)
        expect(() => list.get(-5)).to.throw(Error, 'Index was outside the bounds of the collection.')
        expect(() => list.get(123)).to.throw(Error, 'Index was outside the bounds of the collection.')
        expect(() => list.get(-5.5)).to.throw(Error, 'Index was outside the bounds of the collection.')
        expect(list.get(2.5)).to.be.undefined
        list.remove(0)
        list.remove(0)
        list.remove(0)
        list.remove(0)
        expect(list.size).to.be.equal(0)
        expect(() => list.get(0)).to.throw(Error, 'Collection is empty.')
    })

    it('Should return correct size and correct numbers from the list', function () {
        list.add(2)
        list.add(5)
        list.add(7)
        list.add(10)
        expect(list.size).to.be.equal(4)
        expect(list.get(2)).to.be.equal(7)
        list.remove(3)
        expect(list.size).to.be.equal(3)
        expect(list.get(2)).to.be.equal(7)
    })
})