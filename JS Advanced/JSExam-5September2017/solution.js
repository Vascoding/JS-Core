class Dialog {
    constructor(message, callback) {
        this.message = message
        this.callback = callback
        this.element = this.createElement()
    }

    createElement() {
        let overlay = $('<div>').addClass('overlay')
        let dialog = $('<div>').addClass('dialog')
        let ok = $('<button>').text('OK')
        let that = this
        ok.on('click', function (event) {
            let inputs = $(that.element).find('input')
            let param = {}
            if (inputs !== '') {
                for (let input of inputs) {
                    param[$(input).attr('name')] = $(input).val()
                }
            }

            that.callback(param)
            event.target.parentNode.parentNode.remove()
        })
        let cancel = $('<button>').text('Cancel')
        cancel.on('click', function (event) {
            event.target.parentNode.parentNode.remove()
        })
        let msg = $('<p>').text(this.message)

        msg.appendTo(dialog)
        ok.appendTo(dialog)
        cancel.appendTo(dialog)
        dialog.appendTo(overlay)
        return overlay
    }

    addInput(labelName, name, type) {
        let labelEl = $('<label>').text(labelName)
        let input = $('<input>').attr('name', `${name}`).attr('type', `${type}`)
        labelEl.insertBefore(this.element.find('button')[0])
        input.insertBefore(this.element.find('button')[0])
    }

    render() {
        $(document.body).append(this.element)
    }
}