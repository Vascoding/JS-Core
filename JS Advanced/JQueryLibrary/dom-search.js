function domSearch(selector, isCaseSensitive) {
    let controlItems = $(selector)
    controlItems.addClass('items-control')

    // Add

    let addControls = $('<div>').addClass('add-controls')
    let button = $('<a>Add</a>').addClass('button').attr('style', 'display: inline-block;')
    let labelForEnter = $('<label>Enter text: </label>')
    $('<input>').appendTo(labelForEnter)
    labelForEnter.appendTo(addControls)
    button.appendTo(addControls)
    addControls.appendTo(controlItems)

    // Search

    let searchContols = $('<div>').addClass('search-controls')

    let labelForSearch = $('<label>Search:</label>')
    let searchInput = $('<input>')

    searchInput.on('input', function () {
        //console.log($(this).val())
        let searchTerm = $(this).val()

        if (searchTerm !== '') {
            if (isCaseSensitive) {
                $('.list-item').each((i, el) => {
                    if (!el.childNodes[1].textContent.includes(searchTerm)) {
                        $(el).attr('style', 'display: none')
                    } else {
                        $(el).attr('style', 'display: block')
                    }
                })
            } else {
                $('.list-item').each((i, el) => {
                    if (!el.childNodes[1].textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
                        $(el).attr('style', 'display: none')
                    } else {
                        $(el).attr('style', 'display: block')
                    }
                })
            }

        } else {
            $('.list-item').each((i, el) => {
                $(el).attr('style', 'display: block')
            })
        }
    })

    searchInput.appendTo(labelForSearch)
    labelForSearch.appendTo(searchContols)

    searchContols.appendTo(controlItems)

    // Results
    let resultItems = $('<div>').addClass('result-controls')
    let ul = $('<ul>').addClass('items-list')

    ul.appendTo(resultItems)
    resultItems.appendTo(controlItems)
    console.log($('div .search-controls:first').find('input').val())


    // Add button

    button.on('click', add)

    function add() {
        let itemValue = $(this).parent().find('input').val()

        let item = $('<li>').addClass('list-item')
        let a = $('<a>X</a>').addClass('button')
        a.on('click', function () {
            $(this).parent().remove()
            console.log();
        })
        let strong = $(`<stron>${itemValue}</stron>`)
        a.appendTo(item)
        strong.appendTo(item)
        item.appendTo(ul)
    }
}
