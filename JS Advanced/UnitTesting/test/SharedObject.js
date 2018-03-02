let expect = require('chai').expect
require('jsdom-global')()
let $ = require('../../JQueryLibrary/jquery-3.3.1.min')

document.body.innerHTML = `<div id="wrapper"><input type="text" id="name"><input type="text" id="income"></div>`

let sharedObject = {
    name: null,
    income: null,
    changeName: function (name) {
        if (name.length === 0) {
            return;
        }
        this.name = name;
        let newName = $('#name');
        newName.val(this.name);
    },
    changeIncome: function (income) {
        if (!Number.isInteger(income) || income <= 0) {
            return;
        }
        this.income = income;
        let newIncome = $('#income');
        newIncome.val(this.income);
    },
    updateName: function () {
        let newName = $('#name').val();
        if (newName.length === 0) {
            return;
        }
        this.name = newName;
    },
    updateIncome: function () {
        let newIncome = $('#income').val();
        if (isNaN(newIncome) || !Number.isInteger(Number(newIncome)) || Number(newIncome) <= 0) {
            return;
        }
        this.income = Number(newIncome);
    }
};
document.body.innerHTML = '<div id="wrapper"><input type="text" id="name"><input type="text" id="income"></div>';

describe('Test Shared Object', function () {
    it('Input should be empty string, and sharedObject.name should be null', function () {
        expect(sharedObject.name).to.be.null
        expect($('#name').val()).to.be.equal('')
    })

    it('Input should be empty string, and sharedObject.income should be null', function () {
        expect(sharedObject.income).to.be.null
        expect($('#income').val()).to.be.equal('')
    })

    it('Input should be empty string, and sharedObject.name should be null', function () {
        sharedObject.changeName('')
        expect(sharedObject.name).to.be.null
        expect($('#name').val()).to.be.equal('')
    })

    it('sharedObject.name and input should be David', function () {
        sharedObject.changeName('David')
        expect(sharedObject.name).to.be.equal('David')
        expect($('#name').val()).to.be.equal('David')
    })

    it('sharedObject.name shoult be Stefan and input should be empty string', function () {
        sharedObject.changeName('Stefan')
        $('#name').val('')
        sharedObject.updateName()
        expect(sharedObject.name).to.be.equal('Stefan')
        expect($('#name').val()).to.be.equal('')
    })

    it('sharedObject.name and input should be Pesho', function () {
        sharedObject.changeName('Stefan')
        $('#name').val('Pesho')
        sharedObject.updateName()
        expect(sharedObject.name).to.be.equal('Pesho')
        expect($('#name').val()).to.be.equal('Pesho')
    })

    it('sharedObject.income should be null and input should be empty string', function () {
        sharedObject.changeIncome(-2)
        expect(sharedObject.income).to.be.null
        expect($('#income').val()).to.be.equal('')
    })

    it('sharedObject.income and input should be 2', function () {
        sharedObject.changeIncome(2)
        expect(sharedObject.income).to.be.equal(2)
        expect($('#income').val()).to.be.equal('2')
    })

    it('sharedObject.income and input should be 2', function () {
        sharedObject.changeIncome(2.5)
        expect(sharedObject.income).to.be.equal(2)
        expect($('#income').val()).to.be.equal('2')
    })

    it('sharedObject.income should be 2, and input should be -5', function () {
        sharedObject.changeIncome(2)
        $('#income').val('-5')
        sharedObject.updateIncome()
        expect(sharedObject.income).to.be.equal(2)
        expect($('#income').val()).to.be.equal('-5')
    })

    it('sharedObject.income and input should be 5', function () {
        sharedObject.changeIncome(2)
        $('#income').val('5')
        sharedObject.updateIncome()
        expect(sharedObject.income).to.be.equal(5)
        expect($('#income').val()).to.be.equal('5')
    })

    it('sharedObject.name should be Angel', function () {
        $('#name').val('Angel')
        sharedObject.updateName()
        expect(sharedObject.name).to.be.equal('Angel')
    })

    it('sharedObject.income should be Nikolai, and input should be empty string', function () {
        sharedObject.changeName('Nikolai')
        $('#name').val('')
        sharedObject.updateName()
        expect(sharedObject.name).to.be.equal('Nikolai')
        $('#name').val('')
    })

    it('sharedObject.income should be 25', function () {
        $('#income').val('25')
        sharedObject.updateIncome()
        expect(sharedObject.income).to.be.equal(25)
    })

    it('sharedObject.income should be 25', function () {
        $('#income').val('str')
        sharedObject.updateIncome()
        expect(sharedObject.income).to.be.equal(25)
    })

    it('sharedObject.income should be 25', function () {
        $('#income').val('-455')
        sharedObject.updateIncome()
        expect(sharedObject.income).to.be.equal(25)
    })

    it('sharedObject.income should be 35', function () {
        $('#income').val('35')
        sharedObject.updateIncome()
        expect(sharedObject.income).to.be.equal(35)
    })

    it('sharedObject.income should be 35', function () {
        $('#income').val('0')
        sharedObject.updateIncome()
        expect(sharedObject.income).to.be.equal(35)
    })

    it('sharedObject.income should be 35', function () {
        $('#income').val('3.5')
        sharedObject.updateIncome()
        expect(sharedObject.income).to.be.equal(35)
    })
    it("sharedObject.income and input should be 25", function () {
        sharedObject.changeIncome(25)
        sharedObject.changeIncome(0)
        expect(sharedObject.income).to.equal(25)
        expect($('#income').val()).to.equal("25")
    })

    it("sharedObject.income should be 25, and input should be 0", function () {
        sharedObject.changeIncome(25)
        $("#income").val("0")
        sharedObject.updateIncome()
        expect(sharedObject.income).to.equal(25)
        expect($("#income").val()).to.equal("0")
    })
})