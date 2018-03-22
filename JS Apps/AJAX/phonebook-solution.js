function attachEvents() {
    $('#btnLoad').on('click', function () {
        $('#phonebook').empty()
        $.ajax({
            method: 'GET',
            url: 'https://phonebook-nakov.firebaseio.com/phonebook.json',
            success: (res) => fillData(res),
            error: function (err) {
                console.log(err)
            }
        })
    })
    $('#btnCreate').on('click', function () {
        let person = $('#person')
        let phone = $('#phone')
        let obj = {
            person: person.val(),
            phone: phone.val()
        }
        person.val('')
        phone.val('')
        $.ajax({
            method: 'POST',
            url: 'https://phonebook-nakov.firebaseio.com/phonebook.json',
            data: JSON.stringify(obj),
            success: function () {
                $('#phonebook').empty()
                $.ajax({
                    method: 'GET',
                    url: 'https://phonebook-nakov.firebaseio.com/phonebook.json',
                    success: (res) => fillData(res),
                    error: function (err) {
                        console.log(err)
                    }
                })
            },
            error: function (err) {
                console.log(err)
            }
        })
    })
    function fillData(res) {
        for (let key in res) {
            let button = $('<button>[Delete]</button>')
            button.on('click', function (event) {
                let target = event.target.parentNode
                $.ajax({
                    method: 'DELETE',
                    url: `https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`,
                    success: $(target).remove()
                })
            })
            let li = $(`<li>${res[key]['person']}: ${res[key]['phone']} </li>`).append(button)
            $('#phonebook').append(li)
        }
    }
}