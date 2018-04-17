$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('/index.html', (ctx) => {
            ctx.loggedIn = auth.isAuth()
            if (ctx.loggedIn) {
                let following = userService.getFollowing()
                let followers = userService.getFollowers()
                let subscriptions = userService.getSubscriptions()

                Promise.all([following, followers, subscriptions])
                    .then(([followingRes, followersRes, subscriptionsRes]) => {
                        console.log(followingRes)
                        console.log(followersRes)
                        console.log(subscriptionsRes)
                        let following = 0
                        if (followingRes[0].subscriptions) {
                            following = followingRes[0].subscriptions.length
                        }
                        let followers = followersRes.length
                        let chirpsInfo = []
                        ctx.name = subscriptionsRes.username
                        if (subscriptionsRes.subscriptions) {
                            for (let obj of subscriptionsRes.subscriptions) {
                                chirpService.loadChirpsByUser(obj)
                                    .then((res) => {
                                        for (let chirp of res) {
                                            chirpsInfo.push({
                                                username: chirp.author,
                                                text: chirp.text,
                                                created: calcTime(chirp._kmd.ect)
                                            })
                                        }
                                        ctx.following = following
                                        ctx.followers = followers
                                        ctx.chirpsCount = subscriptionsRes.length
                                        ctx.chirps = chirpsInfo === [] ? 'no chirps' : chirpsInfo
                                        ctx.loadPartials({
                                            header: './templates/common/header.hbs',
                                            footer: './templates/common/footer.hbs',
                                            viewFeed: './templates/home/viewFeed.hbs',
                                            chirp: './templates/home/chirp.hbs',
                                        }).then(function () {
                                            this.partial('./templates/home/home.hbs')
                                        })
                                    })
                            }
                        } else {
                            ctx.following = following
                            ctx.followers = followers
                            ctx.chirpsCount = 0
                            ctx.name = subscriptionsRes.username
                            ctx.loadPartials({
                                header: './templates/common/header.hbs',
                                footer: './templates/common/footer.hbs',
                                viewFeed: './templates/home/viewFeed.hbs',
                                chirp: './templates/home/chirp.hbs',
                            }).then(function () {
                                this.partial('./templates/home/home.hbs')
                            })
                        }
                    })
            } else {
                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    viewFeed: './templates/home/viewFeed.hbs',
                    chirp: './templates/home/chirp.hbs',
                }).then(function () {
                    this.partial('./templates/home/home.hbs')
                })
            }

        })

        this.get('/register', (ctx) => {
            ctx.loadPartials({
                registerForm: './templates/register/registerForm.hbs',
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs')
            })
        })

        this.post('/register', (ctx) => {
            if (ctx.params.password === ctx.params.repeatPass) {
                auth.register(ctx.params.username, ctx.params.password)
                    .then((res) => {
                        auth.saveSession(res)
                        ctx.redirect('#/index.html')
                        auth.showInfo('registered successfully!')
                    })
                    .catch((err) => auth.handleError(err))
            } else {
                auth.showError('Password must match Repeat Password')
            }
        })

        this.get('/login', (ctx) => {
            ctx.loadPartials({
                loginForm: './templates/login/loginForm.hbs',
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs')
            })
        })

        this.post('/login', (ctx) => {
            auth.login(ctx.params.username, ctx.params.password)
                .then((res) => {
                    auth.saveSession(res)
                    auth.showInfo('Logged in successfully!')
                    ctx.redirect('#/index.html')
                })
                .catch((err) => auth.handleError(err))
        })

        this.get('/logout', (ctx) => {
            auth.logout()
                .then(() => {
                    sessionStorage.clear()
                    ctx.redirect('#/index.html')
                })
        })

        this.get('/user/:username', (ctx) => {
            chirpService.loadChirpsByUser(ctx.params.username.slice(1, ctx.params.username.length))
                .then((res) => {
                    let chirpsInfo = []
                    for (let chirp of res) {
                        chirpsInfo.push({
                            username: chirp.author,
                            text: chirp.text,
                            created: calcTime(chirp._kmd.ect)
                        })
                    }

                    userService.getUserById()
                        .then((res) => {

                            if (res.subscriptions) {
                                ctx.unfollowed = !res.subscriptions.includes(ctx.params.username.slice(1, ctx.params.username.length))
                            } else {
                                ctx.unfollowed = true
                            }
                            ctx.chirps = chirpsInfo
                            ctx.username = ctx.params.username.slice(1, ctx.params.username.length)
                            ctx.loggedIn = auth.isAuth()
                            ctx.loadPartials({
                                header: './templates/common/header.hbs',
                                chirp: './templates/home/chirp.hbs',
                                footer: './templates/common/footer.hbs',
                            }).then(function () {
                                this.partial('./templates/profile/viewProfile.hbs')
                            })
                        })
                })
        })

        this.post('/create', (ctx) => {
            chirpService.createChirp(ctx.params.text, sessionStorage.getItem('username'))
                .then(() => {
                    auth.showInfo('Successfully created chirp!')
                    ctx.redirect('#/index.html')
                })
        })

        this.get('/me', (ctx) => {
            chirpService.loadChirpsByUser(sessionStorage.getItem('username'))
                .then((res) => {
                    ctx.username = sessionStorage.getItem('username')
                    ctx.chirpsCount = res.length
                    res.forEach((c, i) => {
                        c.created = calcTime(c._kmd.ect)
                    })
                    ctx.chirps = res
                    userService.getFollowing().then((res) => {
                        if (res[0].subscriptions) {
                            ctx.following = res[0].subscriptions.length
                        }
                        userService.getFollowers().then((res) => {
                            if (res.length) {
                                ctx.followers = res.length
                            }
                            ctx.loggedIn = auth.isAuth()
                            ctx.loadPartials({
                                header: './templates/common/header.hbs',
                                myChirp: './templates/profile/myChirp.hbs',
                                footer: './templates/common/footer.hbs',
                            }).then(function () {
                                this.partial('./templates/profile/viewMe.hbs')
                            })
                        })
                    })
                })
                .catch((err) => auth.handleError(err))
        })

        this.get('/delete/:id', (ctx) => {
            chirpService.deleteChirp(ctx.params.id.slice(1, ctx.params.id.length))
                .then(() => {
                    auth.showInfo('Chirp deleted successfully!')
                    ctx.redirect('#/me')
                })
                .catch((err) => auth.handleError(err))
        })

        this.get('/discover', (ctx) => {
            userService.loadAllUsers()
                .then((res) => {
                    let allUsers = res.filter(u => u.username !== sessionStorage.getItem('username'))
                    for (let us of res) {
                        userService.getUserFollowers(us.username)
                            .then((res) => {
                                allUsers.followersCount = res.length

                            })
                    }
                    ctx.loggedIn = auth.isAuth()
                    ctx.users = allUsers
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        userBox: './templates/discover/userBox.hbs',
                        footer: './templates/common/footer.hbs',
                    }).then(function () {
                        this.partial('./templates/discover/discover.hbs')
                    })
                })
        })

        this.get('/follow/:username', (ctx) => {
            userService.getUserById()
                .then((res) => {
                    if (!res.subscriptions) {
                        res.subscriptions = []
                    }
                    res.subscriptions.push(ctx.params.username.slice(1, ctx.params.username.length))
                    userService.updateUserFollowing(res)
                        .then(() => {
                            ctx.redirect('#/discover')
                        })
                })
        })

        this.get('/unfollow/:username', (ctx) => {
            userService.getUserById()
                .then((res) => {
                    res.subscriptions = res.subscriptions.filter(u => u !== ctx.params.username.slice(1, ctx.params.username.length))
                    userService.updateUserFollowing(res)
                        .then(() => {
                            ctx.redirect('#/discover')
                        })
                })
        })
    })

        function calcTime(dateIsoFormat) {
            let diff = new Date - (new Date(dateIsoFormat));
            diff = Math.floor(diff / 60000);
            if (diff < 1) return 'less than a minute';
            if (diff < 60) return diff + ' minute' + pluralize(diff);
            diff = Math.floor(diff / 60);
            if (diff < 24) return diff + ' hour' + pluralize(diff);
            diff = Math.floor(diff / 24);
            if (diff < 30) return diff + ' day' + pluralize(diff);
            diff = Math.floor(diff / 30);
            if (diff < 12) return diff + ' month' + pluralize(diff);
            diff = Math.floor(diff / 12);
            return diff + ' year' + pluralize(diff);

            function pluralize(value) {
                if (value !== 1) return 's';
                else return '';
            }
        }


        app.run();
    });