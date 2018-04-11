$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/home', getWelcomePage)
        this.get('index.html', getWelcomePage)

        function getWelcomePage(ctx) {
            ctx.loggedIn = auth.isAuth()
            ctx.username = sessionStorage.getItem('username') === undefined ? '' : sessionStorage.getItem('username')
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                navigate: './templates/common/navigation.hbs',
            }).then(function () {
                this.partial('./templates/home/viewWelcome.hbs')
            })
        }

        this.post('#/register', (ctx) => {
            if (ctx.params.password === ctx.params.repeatPass) {
                auth.register(ctx.params.username, ctx.params.password)
                    .then((res) => {
                        auth.showInfo('successfully registered')
                        auth.saveSession(res)
                        ctx.redirect('#/home')
                    })
            } else {
                auth.showError('Password must match repeat password!')
            }
        })

        this.post('#/login', (ctx) => {
            auth.login(ctx.params.username, ctx.params.password)
                .then((res) => {
                    auth.showInfo('successfully logged in')
                    auth.saveSession(res)
                    ctx.redirect('#/catalog')
                })
        })

        this.get('#/logout', (ctx) => {
            auth.logout()
                .then(() => {
                    auth.showInfo('successfully logged out')
                    sessionStorage.clear()
                    ctx.redirect('#/home')
                })
        })

        this.get('#/catalog', (ctx) => {
            postService.getAllPosts()
                .then((res) => {
                    res.forEach((p, i) => {
                        p.submitted = calcTime(p._kmd.ect)
                        p.isAuthor = sessionStorage.getItem('username') === p.author
                    })
                    ctx.username = sessionStorage.getItem('username')
                    ctx.posts = res
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navigate: './templates/common/navigation.hbs',
                        post: './templates/posts/post.hbs',
                    }).then(function () {
                        this.partial('./templates/posts/viewCatalog.hbs')
                    })
                })
        })

        this.get('#/comments/:id', (ctx) => {
            postService.getPost(ctx.params.id.slice(1, ctx.params.id.length))
                .then((res) => {
                    let post = res
                    commentService.getPostComments(res._id)
                        .then((res) => {
                            res.forEach((c, i) => {
                                c.created = calcTime(c._kmd.ect)
                                c.isAuthor = sessionStorage.getItem('username') === c.author
                                c.postId = post._id
                            })
                            ctx.comments = res
                            ctx.title = post.title
                            ctx.url = post.url
                            ctx.imageUrl = post.imageUrl
                            ctx.description = post.description
                            ctx.submitted = calcTime(post._kmd.ect)
                            ctx.author = post.author
                            ctx.postId = post._id
                            ctx._id = post._id
                            ctx.isCreator = sessionStorage.getItem('username') === post.author
                            ctx.loadPartials({
                                header: './templates/common/header.hbs',
                                footer: './templates/common/footer.hbs',
                                navigate: './templates/common/navigation.hbs',
                                viewComment: './templates/comments/viewComment.hbs',
                            }).then(function () {
                                this.partial('./templates/comments/viewComments.hbs')
                            })
                        })
                })
        })

        this.get('#/submit/post', (ctx) => {
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                navigate: './templates/common/navigation.hbs',
            }).then(function () {
                this.partial('./templates/posts/viewSubmitPost.hbs')
            })
        })

        this.post('#/submit/post', (ctx) => {
            postService.createPost(ctx.params.title, ctx.params.description, ctx.params.url, ctx.params.image)
                .then((res) => {
                    if (ctx.params.comment !== '') {
                        commentService.postComment(res._id, ctx.params.comment)
                    }
                    auth.showInfo('Successfully created post!')
                    ctx.redirect('#/catalog')
                })
        })

        this.post('#/submit/comment', (ctx) => {
            commentService.postComment(ctx.params.postId, ctx.params.content)
                .then((res) => {
                    auth.showInfo('Successfully posted comment')
                    ctx.redirect(`#/comments/:${res.postId}`)
                })
        })

        this.get('#/edit/post/:id', (ctx) => {
            let postId = ctx.params.id.slice(1, ctx.params.id.length)
            postService.getPost(postId)
                .then((res) => {
                    ctx.title = res.title
                    ctx._id = res._id
                    ctx.url = res.url
                    ctx.imageUrl = res.imageUrl
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navigate: './templates/common/navigation.hbs',
                    }).then(function () {
                        this.partial('./templates/edit/editPostView.hbs')
                    })
                })
        })

        this.post('#/edit/post/:id', (ctx) => {
            let postId = ctx.params.id.slice(1, ctx.params.id.length)
            let title = ctx.params.title
            let description = ctx.params.description
            let url = ctx.params.url
            let imageUrl = ctx.params.image

            postService.editPost(postId, title, description, url, imageUrl)
                .then(() => {
                    auth.showInfo('Successfully edited post!')
                    ctx.redirect('#/catalog')
                })
        })

        this.get('#/delete/post/:id', (ctx) => {
            postService.deletePost(ctx.params.id.slice(1, ctx.params.id.length))
                .then(() => {
                    auth.showInfo('Successfully deleted post!')
                    ctx.redirect('#/catalog')
                })
        })

        this.post('#/delete/comment/:id', (ctx) => {
            commentService.deleteComment(ctx.params.id.slice(1, ctx.params.id.length))
                .then(() => {
                    auth.showInfo('Successfully deleted comment!')
                    ctx.redirect(`#/comments/:${ctx.params.postId}`)
                })
        })

        this.get('#/myposts', (ctx) => {
            userService.getUserPosts()
                .then((res) => {
                    ctx.posts = res
                    ctx.isAuthor = true
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        navigate: './templates/common/navigation.hbs',
                        post: './templates/posts/post.hbs',
                    }).then(function () {
                        this.partial('./templates/posts/viewMyPosts.hbs')
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