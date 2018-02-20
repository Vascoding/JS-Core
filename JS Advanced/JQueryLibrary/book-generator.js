function createBook(selector, title, author, isbn) {
    let bookId = 'book' + ($(selector).find('div').length + 1)

    let book = $('<div>')
        .attr('id', bookId)
        .attr('style', 'border: ;')
        .appendTo($(selector))


    $(`<p>${title}</p>`).addClass('title').appendTo(book)
    $(`<p>${author}</p>`).addClass('author').appendTo(book)
    $(`<p>${isbn}</p>`).addClass('isbn').appendTo(book)

    $('<button>')
        .text('Select')
        .on('click', select)
        .appendTo(book)

    $('<button>')
        .text('Deselect')
        .on('click', deSelect)
        .appendTo(book)

    function select() {
        $(this.parentNode).attr('style', 'border: 2px solid blue;')
    }

    function deSelect() {
        $(this.parentNode).attr('style', 'border: ;')
    }
}
