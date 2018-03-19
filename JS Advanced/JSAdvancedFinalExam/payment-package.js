let expect = require('chai').expect

class PaymentPackage {
    constructor(name, value) {
        this.name = name;
        this.value = value;
        this.VAT = 20;      // Default value
        this.active = true; // Default value
    }

    get name() {
        return this._name;
    }

    set name(newValue) {
        if (typeof newValue !== 'string') {
            throw new Error('Name must be a non-empty string');
        }
        if (newValue.length === 0) {
            throw new Error('Name must be a non-empty string');
        }
        this._name = newValue;
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('Value must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('Value must be a non-negative number');
        }
        this._value = newValue;
    }

    get VAT() {
        return this._VAT;
    }

    set VAT(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('VAT must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('VAT must be a non-negative number');
        }
        this._VAT = newValue;
    }

    get active() {
        return this._active;
    }

    set active(newValue) {
        if (typeof newValue !== 'boolean') {
            throw new Error('Active status must be a boolean');
        }
        this._active = newValue;
    }

    toString() {
        const output = [
            `Package: ${this.name}` + (this.active === false ? ' (inactive)' : ''),
            `- Value (excl. VAT): ${this.value}`,
            `- Value (VAT ${this.VAT}%): ${this.value * (1 + this.VAT / 100)}`
        ];
        return output.join('\n');
    }
}


describe('Test String Builder class', function () {
    let paymentPackage
    beforeEach(function () {
        paymentPackage = new PaymentPackage('Payment', 100)
    })

    it('Should return Payment', function () {

        expect(() => {let payment = new PaymentPackage('str')}).to.throw(Error, 'Value must be a non-negative number')
        expect(() => {let payment = new PaymentPackage(55)}).to.throw(Error, 'Name must be a non-empty string')
        expect(() => {let payment = new PaymentPackage()}).to.throw(Error, 'Name must be a non-empty string')
    })

    it('Should return Payment', function () {
        expect(paymentPackage.name).to.be.equal('Payment')
        expect(paymentPackage.value).to.be.equal(100)
        expect(paymentPackage.VAT).to.be.equal(20)
        expect(paymentPackage.active).to.be.equal(true)
    })

    it('Should have functions add, delete and tostring', function () {
        expect(PaymentPackage.prototype.hasOwnProperty('name')).to.be.true
        expect(PaymentPackage.prototype.hasOwnProperty('value')).to.be.true
        expect(PaymentPackage.prototype.hasOwnProperty('VAT')).to.be.true
        expect(PaymentPackage.prototype.hasOwnProperty('active')).to.be.true
        expect(PaymentPackage.prototype.hasOwnProperty('toString')).to.be.true
    })

    it('Should work correctly', function () {
        paymentPackage.name = 'new payment'
        expect(paymentPackage.name).to.be.equal('new payment')
        paymentPackage.value = 50
        expect(paymentPackage.value).to.be.equal(50)
        paymentPackage.VAT = 30
        expect(paymentPackage.VAT).to.be.equal(30)
        paymentPackage.active = false
        expect(paymentPackage.active).to.be.equal(false)
    })

    it('Should work correctly', function () {
        paymentPackage.name = 'new payment'
        expect(paymentPackage.name).to.be.equal('new payment')
        paymentPackage.value = 5.5
        expect(paymentPackage.value).to.be.equal(5.5)
        paymentPackage.VAT = 3.14
        expect(paymentPackage.VAT).to.be.equal(3.14)
        paymentPackage.active = false
        expect(paymentPackage.active).to.be.equal(false)
    })

    it('Should work correctly', function () {
        paymentPackage.name = 'new payment'
        expect(paymentPackage.name).to.be.equal('new payment')
        paymentPackage.value = 0
        expect(paymentPackage.value).to.be.equal(0)
        paymentPackage.VAT = 0
        expect(paymentPackage.VAT).to.be.equal(0)
    })

    it('Should return Payment', function () {
        expect(() => paymentPackage.name = 55).to.throw(Error, 'Name must be a non-empty string')
        expect(() => paymentPackage.name = '').to.throw(Error, 'Name must be a non-empty string')
        expect(() => paymentPackage.value = 'str').to.throw(Error, 'Value must be a non-negative number')
        expect(() => paymentPackage.value = -4).to.throw(Error, 'Value must be a non-negative number')
        expect(() => paymentPackage.VAT = 'str').to.throw(Error, 'VAT must be a non-negative number')
        expect(() => paymentPackage.VAT = -5).to.throw(Error, 'VAT must be a non-negative number')
        expect(() => paymentPackage.active = -5).to.throw(Error, 'Active status must be a boolean')
        expect(() => paymentPackage.active = 'str').to.throw(Error, 'Active status must be a boolean')
        expect(() => paymentPackage.active = []).to.throw(Error, 'Active status must be a boolean')
        expect(() => paymentPackage.active = {name: 'Pesho'}).to.throw(Error, 'Active status must be a boolean')
    })

    it('Should work correctly', function () {
        paymentPackage.name = 'new payment'
        expect(paymentPackage.name).to.be.equal('new payment')
        paymentPackage.value = 50
        expect(paymentPackage.value).to.be.equal(50)
        paymentPackage.VAT = 30
        expect(paymentPackage.VAT).to.be.equal(30)

        expect(paymentPackage.toString()).to.be.equal('Package: new payment\n- Value (excl. VAT): 50\n- Value (VAT 30%): 65')
    })

    it('Should work correctly', function () {
        paymentPackage.name = 'new payment'
        expect(paymentPackage.name).to.be.equal('new payment')
        paymentPackage.value = 50
        expect(paymentPackage.value).to.be.equal(50)
        paymentPackage.VAT = 30
        expect(paymentPackage.VAT).to.be.equal(30)
        paymentPackage.active = false

        expect(paymentPackage.toString()).to.be.equal('Package: new payment (inactive)\n- Value (excl. VAT): 50\n- Value (VAT 30%): 65')
    })
})