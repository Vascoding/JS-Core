$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/home', getWelcomePage)
        this.get('index.html', getWelcomePage)

        function getWelcomePage(ctx) {
            ctx.loggedIn = auth.isAuth()
            ctx.username = sessionStorage.getItem('username') === undefined ? '' : sessionStorage.getItem('username')
            if (auth.isAuth()) {
                receiptService.getActiveReceipt()
                    .then((res) => {
                        if (res.length !== 0) {
                            let receipt = res
                            entryService.getEntriesByReceipt(receipt[0]._id)
                                .then((res) => {
                                    let total = 0
                                    res.forEach((e, i) => {
                                        e.subTotal = (Number(e.price) * Number(e.qty)).toFixed(2)
                                        total += Number(e.price) * Number(e.qty)
                                    })


                                    ctx._id = receipt[0]._id
                                    ctx.entries = res
                                    ctx.total = total.toFixed(2)
                                    ctx.loadPartials({
                                        header: './templates/common/header.hbs',
                                        footer: './templates/common/footer.hbs',
                                        editor: './templates/home/editorView.hbs',
                                        entriesView: './templates/entry/entriesView.hbs',
                                    }).then(function () {
                                        this.partial('./templates/home/viewWelcome.hbs')
                                    })
                                })
                                .catch((err) => notify.handleError(err))

                        } else {
                            receiptService.createReceipt()
                                .then((res) => {
                                    console.log(res)
                                    ctx._id = res._id
                                    ctx.loadPartials({
                                        header: './templates/common/header.hbs',
                                        footer: './templates/common/footer.hbs',
                                        editor: './templates/home/editorView.hbs',
                                    }).then(function () {
                                        this.partial('./templates/home/viewWelcome.hbs')
                                    })
                                }).catch((err) => notify.handleError(err))
                        }
                    })
                    .catch((err) => notify.handleError(err))
            } else {
                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                }).then(function () {
                    this.partial('./templates/home/viewWelcome.hbs')
                })
            }
        }

        this.post('#/register', (ctx) => {
            let username = ctx.params['username-register']
            let password = ctx.params['password-register']
            let repeat = ctx.params['password-register-check']

            if (username.length < 5) {
                notify.showError('A username should be a string with at least 5 characters long')
            } else if (password === '') {
                notify.showError('Password should not be empty string')
            } else if (password !== repeat) {
                notify.showError('Password must match Password Check')
            } else {
                auth.register(username, password)
                    .then((res) => {
                        auth.saveSession(res)
                        notify.showInfo('User registration successful.')
                        ctx.redirect('#/home')
                    }).catch((err) => notify.handleError(err))
            }
        })


        this.post('#/login', (ctx) => {
            let username = ctx.params['username-login']
            let password = ctx.params['password-login']

            if (username.length < 5) {
                notify.showError('A username should be a string with at least 5 characters long')
            } else if (password === '') {
                notify.showError('Password should not be empty string')
            } else {
                auth.login(username, password)
                    .then((res) => {
                        auth.saveSession(res)
                        notify.showInfo('Login successful.')
                        ctx.redirect('#/home')
                    }).catch((err) => notify.handleError(err))
            }

        })

        this.get('#/_logout', (ctx) => {
            auth.logout()
                .then(() => {
                    sessionStorage.clear()
                    notify.showInfo('Successfully logged out')
                    ctx.redirect('#/home')
                }).catch((err) => notify.handleError(err))
        })

        this.get('#/editor', (ctx) => {
            ctx.user = sessionStorage.getItem('username') === undefined ? '' : sessionStorage.getItem('username')
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                this.partial('./templates/receipt/viewReceipts.hbs')
            })
        })

        this.get('#/entry/delete/:id', (ctx) => {
            let id = getUrlParam(ctx.params.id)
            entryService.getEntryById(id)
                .then((res) => {
                    entryService.removeEntryFromReceipt(res)
                        .then(() => {
                            notify.showInfo('Entry removed')
                            ctx.redirect('#/home')
                        })
                        .catch((err) => notify.handleError(err))
                }).catch((err) => notify.handleError(err))
        })

        this.post('#/entry/create', (ctx) => {
            let type = ctx.params.type
            let qty = ctx.params.qty
            let price = ctx.params.price
            let receiptId = ctx.params.receiptId
            if (type === '') {
                notify.showError('Product name should not be empty string!')
            } else if (qty === '' || isNaN(qty)) {
                notify.showError('Quantity of the product should be a number')
            } else if (price === '' || isNaN(price)) {
                notify.showError('Price of the product should be a number')
            } else {
                let entry = {
                    type,
                    qty,
                    price,
                    receiptId
                }
                entryService.createEntry(entry)
                    .then(() => {
                        notify.showInfo('Entry added!')
                        ctx.redirect('#/home')
                    }).catch((err) => notify.handleError(err))
            }
        })

        this.post('#/checkout', (ctx) => {
            let receiptId = ctx.params.receiptId
            let tot = ctx.params.total

            entryService.getEntriesByReceipt(receiptId)
                .then((res) => {
                    if (res.length !== 0) {
                        let data = {
                            active: false,
                            total: tot,
                            productCount: res.length
                        }
                        receiptService.updateReceipt(receiptId, data)
                            .then(() => {
                                notify.showInfo('Receipt checked out')
                                ctx.redirect('#/home')
                            }).catch((err) => notify.handleError(err))
                    } else {
                        notify.showError('Receipt should have at least 1 product')
                    }
                })
        })

        this.get('#/archive', (ctx) => {
            ctx.username = ctx.user = sessionStorage.getItem('username') === undefined ? '' : sessionStorage.getItem('username')

            receiptService.getInactiveReceipts()
                .then((res) => {
                    ctx.receipts = res
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        receipt: './templates/receipt/receipt.hbs',
                    }).then(function () {
                        this.partial('./templates/receipt/viewReceipts.hbs')
                    })
                }).catch((err) => notify.handleError(err))
        })

        this.get('#/details/:id', (ctx) => {
            ctx.username = ctx.user = sessionStorage.getItem('username') === undefined ? '' : sessionStorage.getItem('username')
            let receiptId = getUrlParam(ctx.params.id)
            console.log(receiptId)
            entryService.getEntriesByReceipt(receiptId)
                .then((res) => {
                    console.log(res)
                    res.forEach((e, i) => {
                        e.subTotal = (Number(e.price) * Number(e.qty)).toFixed(2)
                    })
                    console.log(res)
                    ctx.receipts = res
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                    }).then(function () {
                        this.partial('./templates/receipt/detailsView.hbs')
                    })
                }).catch((err) => notify.handleError(err))
        })

    })

    function getUrlParam(param) {
        return param.slice(1, param.length)
    }

    app.run();
});