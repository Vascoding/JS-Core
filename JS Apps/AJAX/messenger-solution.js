function attachEvents() {
    $('#submit').on('click', function () {
        let author = $('#author')
        let content = $('#content')
        let timeStamp = Date.now()
        let message = {
            author: author.val(),
            content: content.val(),
            timestamp: timeStamp
        }

        $.ajax({
            method: 'POST',
            url: 'https://firstfirebaseproject-18f55.firebaseio.com/messenger.json',
            data: JSON.stringify(message),
            success: function () {
                    content.val('')
            },
            error: function (err) {
                console.log(err)
            }
        })
    })

    $('#refresh').on('click', function () {
        $.ajax({
            method: 'GET',
            url: 'https://firstfirebaseproject-18f55.firebaseio.com/messenger.json',
            success: function (res) {
                let result = ''
                let ordered = Object.keys(res).sort((a, b) => {
                    return res[b].timestamp - res[a].timestamp
                })
                for (let key of ordered) {
                    result += `${res[key].author}: ${res[key].content}\n`
                }
                $('#messages').text(result)
            },
            error: function (err) {
                console.log(err)
            }
        })
    })
}