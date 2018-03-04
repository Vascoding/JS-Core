let expect = require('chai').expect
require('jsdom-global')()
let $ = require('../../JQueryLibrary/jquery-3.3.1.min')

function nuke(selector1, selector2) {
    if (selector1 === selector2) return;
    $(selector1).filter(selector2).remove();
}


describe('Test ArmageDOM', function () {
    beforeEach(function () {
        document.body.innerHTML =
                                `<body>
                                    <div id="target">
                                        <div class="nested target">
                                            <p>This is some text</p>
                                        </div>
                                        <div class="target">
                                            <p>Empty div</p>
                                        </div>
                                        <div class="inside">
                                            <span class="nested">Some more text</span>                  
                                            <span class="target">Some more text</span>
                                        </div>
                                    </div>
                                 </body>
                    `
    })

    it('Should return undefined', function () {
        let beforeNuke = $('body').html()
        nuke('.nested', '.nested');
        let afterNuke = $('body').html()
        expect(beforeNuke).to.be.equal(afterNuke)
    })

    it('Should return undefined', function () {
        let beforeNuke = $('body').html()
        nuke('.nested', 's');
        let afterNuke = $('body').html()
        expect(beforeNuke).to.be.equal(afterNuke)
    })

    it('Should return undefined', function () {
        let beforeNuke = $('body').html()
        nuke('.nested');
        let afterNuke = $('body').html()
        expect(beforeNuke).to.be.equal(afterNuke)
    })

    it('Should return undefined', function () {
        let beforeNuke = $('body').html()
        nuke('.nested', '');
        let afterNuke = $('body').html()
        expect(beforeNuke).to.be.equal(afterNuke)
    })

    it('Should return undefined', function () {
        let beforeNuke = $('span.target').html()
        nuke('div', '.target');
        let afterNuke = $('span.target').html()
        expect(beforeNuke).to.be.equal(afterNuke)
    })

    it('Should return undefined', function () {
        nuke('span', '.target');
        let afterNuke = $('span.target').html()
        expect(afterNuke).to.be.equal(undefined)
    })
})