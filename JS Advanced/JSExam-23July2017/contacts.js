class Contact {
    constructor(firstName, lastName, phone, email) {
        this.firstName = firstName
        this.lastName = lastName
        this.phone = phone
        this.email = email
        this._online = false
        this.element = $('<article>')
    }

    set online(value){
        let div = this.element.find('.title')
        if (value) {
            div.addClass('online')
        } else {
            div.removeClass('online')
        }
        this._online = value
    }

    get online(){
        return this._online
    }

    render(id) {
        let infoButton = $('<button>&#8505;</button>').on('click', function (event) {
            let div = $(event.target.parentNode.parentNode).find('.info')
            if (div.attr('style') === 'display: none') {
                div.attr('style', 'display: block')
            } else {
                div.attr('style', 'display: none')
            }
        })
        let title = $(`<div class="title">${this.firstName} ${this.lastName}</div>`)
        if (this.online) {
            title.addClass('online')
        }
        infoButton.appendTo(title)
        title.appendTo(this.element)
        let info = $(`<div class="info" style="display: none"></div>`)
        let phone = $(`<span>&phone; ${this.phone}</span>`)
        let email = $(`<span>&#9993; ${this.email}</span>`)

        phone.appendTo(info)
        email.appendTo(info)
        info.appendTo(this.element)

        this.element.appendTo('#' + id)
    }
}

let contacts = [
    new Contact("Ivan", "Ivanov", "0888 123 456", "i.ivanov@gmail.com"),
    new Contact("Maria", "Petrova", "0899 987 654", "mar4eto@abv.bg"),
    new Contact("Jordan", "Kirov", "0988 456 789", "jordk@gmail.com")
];

contacts.forEach(c => c.render('main'));

setTimeout(() => contacts[1].online = true, 2000);