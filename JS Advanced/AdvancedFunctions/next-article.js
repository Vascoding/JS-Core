function getArticleGenerator(articles) {
    return function () {
        if (articles.length !== 0) {
            $('#content').append(`<article>${articles.shift()}</article>`)
        }
    }
}
