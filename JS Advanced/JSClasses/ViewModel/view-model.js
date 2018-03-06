class Textbox {
    constructor(selector, regex) {
        this._elements = $(selector)
        this._invalidSymbols = regex
        this._value = undefined
        this.onInput()
    }

    get value(){
        return this._value
    }

    set value(val){
        this._value =  val
        for (let el of this.elements) {
            $(el).val(val)
        }
    }

    get elements(){
        return this._elements
    }

    onInput() {
        this.elements.on('input', (event) => {
            this.value = $(event.target).val()
        })
    }

    isValid() {
        return !this._value.match(this._invalidSymbols)
    }
}

let textbox = new Textbox(".textbox",/[^a-zA-Z0-9]/)
let inputs = $('.textbox')
inputs.on('input',function(){console.log(textbox.value)})
