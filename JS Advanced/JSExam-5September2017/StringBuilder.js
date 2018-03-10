let expect = require('chai').expect

class StringBuilder {
    constructor(string) {
        if (string !== undefined) {
            StringBuilder._vrfyParam(string);
            this._stringArray = Array.from(string);
        } else {
            this._stringArray = [];
        }
    }
    append(string) {
        StringBuilder._vrfyParam(string);
        for(let i = 0; i < string.length; i++) {
            this._stringArray.push(string[i]);
        }
    }
    prepend(string) {
        StringBuilder._vrfyParam(string);
        for(let i = string.length - 1; i >= 0; i--) {
            this._stringArray.unshift(string[i]);
        }
    }
    insertAt(string, startIndex) {
        StringBuilder._vrfyParam(string);
        this._stringArray.splice(startIndex, 0, ...string);
    }
    remove(startIndex, length) {
        this._stringArray.splice(startIndex, length);
    }
    static _vrfyParam(param) {
        if (typeof param !== 'string') throw new TypeError('Argument must be string');
    }
    toString() {
        return this._stringArray.join('');
    }
}

describe('Test String Builder class', function () {
    let stringBuilder
    beforeEach(function () {
        stringBuilder = new StringBuilder('Hello')
    })

    it('Should return 5', function () {
        expect(stringBuilder._stringArray.length).to.be.equal(5)
    })

    it('Should be empty', function () {
        let strBuilder = new StringBuilder()
        expect(strBuilder.toString()).to.be.equal('')
        expect(strBuilder._stringArray.length).to.be.equal(0)
    })

    it('Should return Hello', function () {
        expect(stringBuilder.toString()).to.be.equal('Hello')
    })

    it('Should return Hello World!', function () {
        stringBuilder.append(' World!')
        expect(stringBuilder.toString()).to.be.equal('Hello World!')
    })

    it('Should return Hello World!', function () {

        expect(() => stringBuilder.append([])).to.throw(TypeError, 'Argument must be string')
    })

    it('Should return Hello World!', function () {
        for (let i = 0; i < 5; i++) {
            stringBuilder.append('Hello')
        }
        expect(stringBuilder.toString()).to.be.equal('HelloHelloHelloHelloHelloHello')
    })

    it('Should return Hello World!', function () {
        for (let i = 0; i < 5; i++) {
            stringBuilder.prepend('Hello')
        }
        expect(stringBuilder.toString()).to.be.equal('HelloHelloHelloHelloHelloHello')
    })

    it('Should return Pesho Hello', function () {
        stringBuilder.prepend('Pesho ')
        expect(stringBuilder.toString()).to.be.equal('Pesho Hello')
    })

    it('Should throw an error', function () {
        expect(() => stringBuilder.prepend({name: 'Pesho'})).to.throw(TypeError, 'Argument must be string')
    })

    it('Should return _Hello', function () {
        stringBuilder.prepend('_', 1)
        expect(stringBuilder.toString()).to.be.equal('_Hello')
    })

    it('Should return _Hello', function () {
        stringBuilder.prepend('_', 232)
        expect(stringBuilder.toString()).to.be.equal('_Hello')
    })

    it('Should return _Hello', function () {
        let str = new StringBuilder()
        str.prepend('_')
        expect(str.toString()).to.be.equal('_')
    })

    it('Should return _Hello', function () {
        stringBuilder.insertAt('_', 1)
        expect(stringBuilder.toString()).to.be.equal('H_ello')
    })

    it('Should return Hello_', function () {
        stringBuilder.insertAt('_', 412)
        expect(stringBuilder.toString()).to.be.equal('Hello_')
    })

    it('Should return _Hello', function () {
        stringBuilder.insertAt('_', -412)
        expect(stringBuilder.toString()).to.be.equal('_Hello')
    })

    it('Should return _Hello', function () {
        stringBuilder.insertAt('_', -412)
        expect(stringBuilder.toString()).to.be.equal('_Hello')
    })

    it('Should return Hlo', function () {

        expect(() => stringBuilder.insertAt(2)).to.throw(TypeError)
    })

    it('Should return Hlo', function () {
        stringBuilder.remove(142, 2)
        expect(stringBuilder.toString()).to.be.equal('Hello')
    })

    it('Should return Hlo', function () {
        stringBuilder.remove(1, 3232)
        expect(stringBuilder.toString()).to.be.equal('H')
    })

    it('Should throw an error', function () {
        let strBuilder
        expect(() => strBuilder = new StringBuilder([])).to.throw(TypeError, 'Argument must be string')
    })
})