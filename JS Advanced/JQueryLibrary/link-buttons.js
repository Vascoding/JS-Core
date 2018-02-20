function attachEvents() {
    $('a').on('click', function () {
        let target = $(this)
        $('a').removeClass('selected')
        if (!target.hasClass('selected')) {
            target.addClass('selected')
        }
    })
}
