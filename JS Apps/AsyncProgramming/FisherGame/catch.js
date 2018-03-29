function attachEvents() {
    let add = $('.add')
    let load = $('.load')

    add.on('click', function () {
        let catchObject = {
            angler: $('#addForm input.angler').val(),
            weight: Number($('#addForm input.weight').val()),
            species: $('#addForm input.species').val(),
            location: $('#addForm input.location').val(),
            bait: $('#addForm input.bait').val(),
            captureTime: Number($('#addForm input.captureTime').val())
        }

        $.ajax({
            method: 'POST',
            url: `https://baas.kinvey.com/appdata/kid_BkBca7B9G/biggestCatches`,
            success: function (res) {
            },
            error: function (err) {
            },
            data: JSON.stringify(catchObject),
            beforeSend: authorize
        })
    })

    load.on('click', function () {
        $('#catches').empty()
        $.ajax({
            method: 'GET',
            url: 'https://baas.kinvey.com/appdata/kid_BkBca7B9G/biggestCatches',
            success: function (res) {
                for (let obj of res) {
                    let element = $(`<div>`)
                    element.addClass(`catch`)
                    element.attr('data-id', `${obj._id}`)
                    element.append('<label>Angler</label>')
                    element.append(`<input type="text" class="angler" value="${obj.angler}"/>`)
                    element.append('<label>Weight</label>')
                    element.append(`<input type="number" class="weight" value="${obj.weight}"/>`)
                    element.append('<label>Species</label>')
                    element.append(`<input type="text" class="species" value="${obj.species}"/>`)
                    element.append('<label>Location</label>')
                    element.append(`<input type="text" class="location" value="${obj.location}"/>`)
                    element.append('<label>Bait</label>')
                    element.append(`<input type="text" class="bait" value="${obj.bait}"/>`)
                    element.append('<label>Capture Time</label>')
                    element.append(`<input type="number" class="captureTime" value="${obj.captureTime}"/>`)

                    let updateButton = $(`<button class="update">Update</button>`).on('click', function (event) {
                        let target = event.target.parentNode
                        //$(target).remove()
                        let targetId = $(target).attr('data-id')

                        let catchObject = {
                            angler: $(target).find('input.angler').val(),
                            weight: $(target).find('input.weight').val(),
                            species: $(target).find('input.species').val(),
                            location: $(target).find('input.location').val(),
                            bait: $(target).find('input.bait').val(),
                            captureTime: $(target).find('input.captureTime').val()
                        }
                        $.ajax({
                            method: 'PUT',
                            url: `https://baas.kinvey.com/appdata/kid_BkBca7B9G/biggestCatches/${targetId}`,
                            success: function (res) {
                            },
                            error: function (err) {
                            },
                            data: JSON.stringify(catchObject),
                            beforeSend: authorize
                        })
                    })
                    let deleteButton = $(`<button class="delete">Delete</button>`).on('click', function (event) {
                        let target = event.target.parentNode
                        $(target).remove()
                        let targetId = $(target).attr('data-id')

                        $.ajax({
                            method: 'DELETE',
                            url: `https://baas.kinvey.com/appdata/kid_BkBca7B9G/biggestCatches/${targetId}`,
                            success: function (res) {
                            },
                            error: function (err) {
                            },
                            beforeSend: authorize
                        })
                    })

                    element.append(updateButton)
                    element.append(deleteButton)

                    element.appendTo('#catches')
                }
            },
            error: function (err) {
            },
            beforeSend: authorize
        })
    })

    function authorize(xhr) {
        xhr.setRequestHeader ("Authorization", "Basic " + btoa('evil' + ":" + 'evil'))
    }
}