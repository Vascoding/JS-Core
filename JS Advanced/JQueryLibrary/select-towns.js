function attachEvents() {
    $('#items').find('li').on('click', function () {
        let selected = $(this)
        if (!selected.attr('data-selected')) {
            selected.css('background', '#DDD')
            selected.attr('data-selected', true)
        } else {
            selected.css('background', '')
            selected.removeAttr('data-selected')
        }
    })

    $('#showTownsButton').on('click', function () {
        let allSelectedTowns = $('#items').find('[data-selected]').toArray()

        $('#selectedTowns').text(`Selected towns: ${allSelectedTowns.map(a => a.textContent).join(', ')}`)
    })
}
