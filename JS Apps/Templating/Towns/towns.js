function attachEvents() {
    $('#btnLoadTowns').on('click', function () {
        let townsInput = $('#towns')
        let townsNames = townsInput.val().split(', ')

        if (townsInput.val() !== '') {
            let source = $("#towns-template").html()
            let template = Handlebars.compile(source)
            for (let townName of townsNames) {
                let context = {
                    name: townName,
                }
                let li = template(context)
                $('#root').append(li)
            }
            townsInput.val('')
        }
    })
}