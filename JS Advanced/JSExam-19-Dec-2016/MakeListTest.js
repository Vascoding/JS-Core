let expect = require('chai').expect

function makeList() {
    let data = [];
    return {
        addLeft: function(item) {
            data.unshift(item);
        },
        addRight: function(item) {
            data.push(item);
        },
        clear: function() {
            data = [];
        },
        toString: function() {
            return data.join(", ");
        }
    };
}


describe('Test makeList', function () {
    let list
    beforeEach(function () {
        list = makeList()
    })

    it('Should return 1, 2, 3', function () {
        list.addLeft(3)
        list.addLeft(2)
        list.addLeft(1)
        expect(list.toString()).to.be.equal('1, 2, 3')
    })

    it('Should return 3, 2, 1', function () {
        list.addRight(3)
        list.addRight(2)
        list.addRight(1)
        expect(list.toString()).to.be.equal('3, 2, 1')
    })

    it('Should return empty string', function () {
        list.addRight(3)
        list.addRight(2)
        list.addRight(1)
        list.clear()
        expect(list.toString()).to.be.equal('')
    })

})