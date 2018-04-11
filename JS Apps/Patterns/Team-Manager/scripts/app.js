$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('/index.html', (ctx) => {
            ctx.loggedIn = auth.isAuth()
            ctx.hasTeam = !auth.hasNoTeam()
            ctx.teamId = auth.getTeamId()
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                this.partial('./templates/home/home.hbs')
            })
        })

        this.get('/about', (ctx) => {
            ctx.loggedIn = auth.isAuth()
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                this.partial('./templates/about/about.hbs')
            })
        })

        this.get('/home', (ctx) => {
            ctx.redirect('#/index.html')
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
            if (ctx.params.password === ctx.params.repeatPassword) {
                auth.register(ctx.params.username, ctx.params.password)
                    .then((res) => {
                        auth.saveSession(res)
                        ctx.redirect('#/index.html')
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
                    ctx.redirect('#/index.html')
                })
                .catch((err) => auth.handleError(err))
        })

        this.get('/logout', (ctx) => {
            sessionStorage.clear()
            ctx.redirect('#/index.html')
        })

        this.get('/catalog', (ctx) => {
            ctx.hasNoTeam = auth.hasNoTeam()
            ctx.loggedIn = auth.isAuth()
            teamsService.loadTeams()
                .then((res) => {
                    ctx.teams = res
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        team: './templates/catalog/team.hbs',
                        footer: './templates/common/footer.hbs',
                    }).then(function () {
                        this.partial('./templates/catalog/teamCatalog.hbs')
                    })
                })
        })

        this.get('/catalog/:id', (ctx) => {
            teamsService.loadTeamDetails(ctx.params.id.slice(1, ctx.params.id.length))
                .then((res) => {
                    ctx.name = res.name
                    ctx.comment = res.comment
                    ctx.loggedIn = auth.isAuth()
                    ctx.isOnTeam = auth.getTeamId() === res._id
                    ctx.isAuthor = auth.isCreator(res.author)
                    ctx.hasNoTeam = auth.hasNoTeam()
                    ctx.teamId = res._id
                    userService.getTeamMembers(res._id)
                        .then((res) => {
                            ctx.members = res
                            ctx.loadPartials({
                                header: './templates/common/header.hbs',
                                teamMember: './templates/catalog/teamMember.hbs',
                                teamControls: './templates/catalog/teamControls.hbs',
                                footer: './templates/common/footer.hbs',
                            }).then(function () {
                                this.partial('./templates/catalog/details.hbs')
                            })
                        })

                })
                .catch((err) => console.log(err))
        })

        this.get('/create', (ctx) => {
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs',
            }).then(function () {
                this.partial('./templates/create/createPage.hbs')
            })
        })

        this.post('/create', (ctx) => {
            teamsService.createTeam(ctx.params.name, ctx.params.comment)
                .then((res) => {
                    teamsService.joinTeam(res._id)
                        .then((res) => {
                            auth.saveSession(res)
                            ctx.redirect('#/catalog')
                        })
                })
                .catch((err) => auth.handleError(err))
        })

        this.get('/edit/:id', (ctx) => {
            teamsService.loadTeamDetails(ctx.params.id.slice(1, ctx.params.id.length))
                .then((res) => {
                    ctx.name = res.name
                    ctx.comment = res.comment
                    ctx.loggedIn = auth.isAuth()
                    ctx.teamId = res._id
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        editForm: './templates/edit/editForm.hbs',
                        footer: './templates/common/footer.hbs',
                    }).then(function () {
                        this.partial('./templates/edit/editPage.hbs')
                    })
                })
                .catch((err) => auth.handleError(err))
        })

        this.post('/edit/:teamId', (ctx) => {
            console.log(ctx.params.teamId)
            teamsService.edit(ctx.params.teamId.slice(1, ctx.params.teamId.length), ctx.params.name, ctx.params.comment)
                .then((res) => {
                    ctx.redirect(`/catalog/:${res._id}`)
                })
                .catch((err) => auth.handleError(err))
        })

        this.get('/join/:teamId', (ctx) => {
            let teamId = ctx.params.teamId.slice(1, ctx.params.teamId.length)
            teamsService.joinTeam(teamId)
                .then(() => {
                    sessionStorage.setItem('teamId', teamId)
                    ctx.redirect(`#/catalog/${ctx.params.teamId}`)
                })

        })

        this.get('/leave', (ctx) => {
            teamsService.leaveTeam()
                .then(() => {
                    sessionStorage.setItem('teamId', undefined)
                    ctx.redirect(`#/catalog`)
                })

        })
    })

    app.run();
});