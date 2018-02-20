function increment(id) {
    let textArea = $('<textarea>')
        .addClass('counter')
        .val('0')
        .attr('disabled', true)

    let incrementBtn = $('<button>')
        .addClass('btn')
        .attr('id', 'incrementBtn')
        .text('Increment')
        .on('click', incrementValue)

    let addBtn = $('<button>')
        .addClass('btn')
        .attr('id', 'addBtn')
        .text('Add')
        .on('click', addValue)

    let ul = $('<ul>').addClass('results')

    $(id).append(textArea).append(incrementBtn).append(addBtn).append(ul)

    function incrementValue() {
        $('.counter').val(Number($('.counter').val()) + 1)
    }

    function addValue() {
        let value = $('.counter').val()

        $('ul').append(`<li>${value}</li>`)
    }
}
