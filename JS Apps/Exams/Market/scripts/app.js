$(() => {
    const app = Sammy('#app', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/home', getWelcomePage)
        this.get('index.html', getWelcomePage)

        function getWelcomePage(ctx) {
            ctx.loggedIn = auth.isAuth()
            ctx.user = sessionStorage.getItem('username') === undefined ? '' : sessionStorage.getItem('username')
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                this.partial('./templates/home/viewWelcome.hbs')
            })
        }

        this.get('/register', (ctx) => {
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                this.partial('./templates/authentication/viewRegister.hbs')
            })
        })

        this.post('/register', (ctx) => {
            auth.register(ctx.params.username, ctx.params.password, ctx.params.name)
                .then((res) => {
                    auth.saveSession(res)
                    auth.showInfo('Successfully registered')
                    ctx.redirect('#/home')
                })
        })

        this.get('/login', (ctx) => {
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                this.partial('./templates/authentication/viewLogin.hbs')
            })
        })

        this.post('/login', (ctx) => {
            auth.login(ctx.params.username, ctx.params.password)
                .then((res) => {
                    auth.saveSession(res)
                    auth.showInfo('Successfully logged in')
                    ctx.redirect('#/home')
                })
        })

        this.get('/logout', (ctx) => {
            auth.logout(ctx.params.username, ctx.params.password)
                .then(() => {
                    sessionStorage.clear()
                    auth.showInfo('Successfully logged out')
                    ctx.redirect('#/home')
                })
        })

        this.get('/shop', (ctx) => {
            ctx.user = sessionStorage.getItem('username') === undefined ? '' : sessionStorage.getItem('username')
            productService.listAllProducts()
                .then((res) => {
                    ctx.loggedIn = true
                    res.forEach((p, i) => {
                        p.price = p.price.toFixed(2)
                    })
                    ctx.products = res
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        product: './templates/products/product.hbs'
                    }).then(function () {
                        this.partial('./templates/products/viewProducts.hbs')
                    })
                })
        })

        this.post('/purchase/:id', (ctx) => {
            let productId = ctx.params.id.slice(1, ctx.params.id.length)
            userService.getLoggedInUser()
                .then((res) => {
                    let user = res
                    productService.getProductById(productId)
                        .then((res) => {
                            if (user.cart === undefined) {
                                user.cart = {
                                    [productId]: {
                                        "quantity": "1",
                                        "product": {
                                            "name": res.name,
                                            "description": res.description,
                                            "price": res.price.toFixed(2)
                                        }
                                    }
                                }
                                userService.purchaseProduct(user)
                                    .then(() => {
                                        auth.showInfo('Successfully purchase product')
                                        ctx.redirect('#/cart')
                                    })
                            } else if (Object.keys(user.cart).includes(productId)) {
                                let qty = Number(user.cart[productId].quantity)
                                user.cart[productId].quantity = ++qty
                                userService.purchaseProduct(user)
                                    .then(() => {
                                        auth.showInfo('Successfully purchase product')
                                        ctx.redirect('#/cart')
                                    })
                            } else {
                                user.cart[productId] = {
                                    "quantity": "1",
                                    "product": {
                                        "name": res.name,
                                        "description": res.description,
                                        "price": res.price.toFixed(2)
                                    }
                                }
                                userService.purchaseProduct(user)
                                    .then(() => {
                                        auth.showInfo('Successfully purchase product')
                                        ctx.redirect('#/cart')
                                    })
                            }
                        })
                })
        })

        this.get('/cart', (ctx) => {
           userService.getLoggedInUser()
               .then((res) => {
                   if (res.cart) {
                       let cartProducts = []
                       for (let key in res.cart) {
                           cartProducts.push({
                               _id: key,
                               name: res.cart[key].product.name,
                               description: res.cart[key].product.description,
                               quantity: res.cart[key].quantity,
                               price: (Number(res.cart[key].product.price) * Number(res.cart[key].quantity)).toFixed(2)
                           })
                       }
                       ctx.products = cartProducts
                       ctx.loggedIn = sessionStorage.getItem('username') !== undefined
                       ctx.user = sessionStorage.getItem('username') === undefined ? '' : sessionStorage.getItem('username')
                       ctx.loadPartials({
                           header: './templates/common/header.hbs',
                           footer: './templates/common/footer.hbs',
                           cart: './templates/cart/cart.hbs'
                       }).then(function () {
                           this.partial('./templates/cart/viewCart.hbs')
                       })
                   } else {
                        auth.showInfo('Nothing in cart yet!')
                       ctx.redirect('#/shop')
                   }
               })
        })

        this.post('/discard/:id', (ctx) => {
            let productId = ctx.params.id.slice(1, ctx.params.id.length)
            userService.getLoggedInUser()
                .then((res) => {
                    delete res.cart[productId]
                    userService.discardProduct(res)
                        .then(() => {
                            auth.showInfo('Product discarded.')
                            ctx.redirect('#/cart')
                        })
                })
        })

    })

    app.run();
});