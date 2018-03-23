class PaymentManager{
    constructor(title){
        this.title = title
        this.element = this.createElement()
    }

    createElement(){
        let table = $('<table>')
        let caption = $('<caption>').text(`${this.title} Payment Manager`)
        caption.appendTo(table)
        let thead = $('<thead>')
        let tr = $('<tr>')
        let name = $('<th>')
        name.addClass('name')
        name.text('Name')

        let category = $('<th>')
        category.addClass('category')
        category.text('Category')
        let price = $('<th>')
        price.addClass('price')
        price.text('Price')
        let action = $('<th>Actions</th>')

        // concat thead

        name.appendTo(tr)
        category.appendTo(tr)
        price.appendTo(tr)
        action.appendTo(tr)
        tr.appendTo(thead)

        thead.appendTo(table)


        // tfoot

        let tfoot = $('<tfoot>')
        tfoot.addClass('input-data')

        let tfootTr = $('<tr>')
        let tdNeme = $('<td><input name="name" type="text"></td>')
        let tdCategory = $('<td><input name="category" type="text"></td>')
        let tdPrice = $('<td><input name="price" type="number"></td>')
        let tdAddButton = $('<td></td>')
        let addButton = $('<button>Add</button>')
        let tbody = $('<tbody class="payments"></tbody>')
        tbody.appendTo(table)
        addButton.on('click', function () {
            let name = $(tdNeme.find('input'))
            let category = $(tdCategory.find('input'))
            let price = $(tdPrice.find('input'))

            if (name.val() !== '' && category.val() !== '' && price.val() !== '') {
                tbody.addClass('payments')

                let bodyTr = $('<tr>')
                let paymentName = $('<td>').text(name.val())
                let paymentCategory = $('<td>').text(category.val())
                let paymentPrice = $('<td>').text(Number(price.val()))

                let deleteTd = $('<td>')
                let deleteButton = $('<button>Delete</button>')
                deleteButton.on('click', function (event) {
                        event.target.parentNode.parentNode.remove()
                })
                name.val('')
                category.val('')
                price.val('')
                deleteButton.appendTo(deleteTd)
                paymentName.appendTo(bodyTr)
                paymentCategory.appendTo(bodyTr)
                paymentPrice.appendTo(bodyTr)
                deleteTd.appendTo(bodyTr)
                bodyTr.appendTo(tbody)
                tbody.insertAfter(thead)
            }
        })
        addButton.appendTo(tdAddButton)

        // concat tfoot

        tdNeme.appendTo(tfootTr)
        tdCategory.appendTo(tfootTr)
        tdPrice.appendTo(tfootTr)
        tdAddButton.appendTo(tfootTr)
        tfootTr.appendTo(tfoot)
        tfoot.appendTo(table)
        return table
    }

    render(id){
        $('#' + id).append(this.element)
    }
}
