let expect = require('chai').expect

class Console {

    static get placeholder() {
        return /{\d+}/g;
    }

    static writeLine() {
        let message = arguments[0];
        if (arguments.length === 1) {
            if (typeof (message) === 'object') {
                message = JSON.stringify(message);
                return message;
            }
            else if (typeof(message) === 'string') {
                return message;
            }
        }
        else {
            if (typeof (message) !== 'string') {
                throw new TypeError("No string format given!");
            }
            else {
                let tokens = message.match(this.placeholder).sort(function (a, b) {
                    a = Number(a.substring(1, a.length - 1));
                    b = Number(b.substring(1, b.length - 1));
                    return a - b;
                });
                if (tokens.length !== (arguments.length - 1)) {
                    throw new RangeError("Incorrect amount of parameters given!");
                }
                else {
                    for (let i = 0; i < tokens.length; i++) {
                        let number = Number(tokens[i].substring(1, tokens[i].length - 1));
                        if (number !== i) {
                            throw new RangeError("Incorrect placeholders given!");
                        }
                        else {
                            message = message.replace(tokens[i], arguments[i + 1])
                        }
                    }
                    return message;
                }
            }
        }
    }
};


describe('Test Even Or Odd', function () {
    it('Should return this is simple string', function () {
        expect(Console.writeLine('this is simple string')).to.be.equal('this is simple string')
    })

    it('Should return string representation of an object', function () {
        expect(Console.writeLine({})).to.be.equal('{}')
    })

    it('Should return string representation of an object', function () {
        expect(Console.writeLine({})).to.be.equal('{}')
    })

    it('Should throw TypeError', function () {
        expect(() => Console.writeLine({}, {})).to.throw(TypeError);
    })

    it('Should throw RangeError', function () {
        expect(() => Console.writeLine('some string {0} {1}', 'first placeholder')).to.throw(RangeError);
    })

    it('Should throw RangeError', function () {
        expect(() => Console.writeLine('some string {0} {4}', 'first placeholder')).to.throw(RangeError);
    })

    it('Should throw RangeError', function () {
        expect(Console.writeLine('some string {0} {1} {2} {3} {4} {5} {6} {7} {8} {9} {10}', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11')).to.be.equal('some string 1 2 3 4 5 6 7 8 9 10 11');
    })
})