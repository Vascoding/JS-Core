let result = (function () {

    class Textbox {
        constructor(selector, regex) {
            this._elements = $(selector)
            this._invalidSymbols = regex
            this._value = undefined
            this.onInput()
        }

        get value() {
            return this._value
        }

        set value(val) {
            this._value = val
            for (let el of this.elements) {
                $(el).val(val)
            }
        }

        get elements() {
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

    class Form {
        constructor() {
            this._element = $('<div>').addClass('form')
            this._textboxes = []
            for (let arg of arguments) {
                this.appendElement(arg)
            }
        }

        appendElement(el) {
            if (el instanceof Textbox) {
                this._element.append(el.elements[0])
                this._textboxes.push(el)
            } else {
                throw new Error('Invalid parameter!')
            }
        }

        submit() {
            let valid = true
            for (let textBox of this._textboxes) {
                if (textBox.isValid()) {
                    textBox.elements.attr('style', 'border: 2px solid green;')
                } else {
                    valid = false
                    textBox.elements.attr('style', 'border: 2px solid red;')
                }
            }

            return valid
        }

        attach(selector) {
            $(selector).append(this._element)
        }

    }

    return {
        Textbox: Textbox,
        Form: Form
    }
}())

let Textbox = result.Textbox;
let Form = result.Form;
let username = new Textbox("#username", /[^a-zA-Z0-9]/);
let password = new Textbox("#password", /[^a-zA-Z]/);
username.value = "username";
password.value = "password2";
let form = new Form(username, password);
console.log(form.submit())
form.attach("#root");
