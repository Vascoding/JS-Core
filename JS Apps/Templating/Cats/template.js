$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        let source = $("#cat-template").html()
        let template = Handlebars.compile(source)

        for (let cat of window.cats) {
            let context = {
                id: cat.id,
                statusCode: cat.statusCode,
                statusMessage: cat.statusMessage,
                imageLocation: cat.imageLocation
            }
            let c = template(context)
            $('#allCats').append(c)
        }
        $('button').on('click', function () {
            let cat = $(this).next()
            let display = cat.attr('style')
            if (display === 'display: none;') {
                cat.attr('style', 'display: block;')
            } else {
                cat.hide()
            }
        })
    }
})
