const AUTH_HEADERS = {'Authorization': "Basic " + btoa('player' + ":" + '123')}

function attachEvents() {
    getPlayers()

    $('#addPlayer').on('click', function () {
        let name = $('#addName')
        let player = {
            name: name.val(),
            bullets: 6,
            money: 500
        }
        addPlayer(player)
        name.val('')
    })
}

function addPlayer(player) {
    $.ajax({
        method: 'POST',
        url: `https://baas.kinvey.com/appdata/kid_HkS3mio9G/players`,
        data: player,
        headers: AUTH_HEADERS
    }).then(getPlayers).catch((err) => console.log(err))
}

function getPlayers() {
    $('#canvas').css('display', 'none')
    $('#save').css('display', 'none')
    $('#reload').css('display', 'none')
    $.ajax({
        method: 'GET',
        url: `https://baas.kinvey.com/appdata/kid_HkS3mio9G/players`,
        headers: AUTH_HEADERS
    }).then((res) => {
        let playersSection = $('#players')
        playersSection.empty()

        for (let player of res) {
            let mainDiv = $(`<div class="player" data-id="${player._id}"></div>`)
            mainDiv.append(`<div class="row"><label>Name:</label><label class="name">${player.name}</label></div>`)
            mainDiv.append(`<div class="row"><label>Money:</label><label class="money">${player.money}</label></div>`)
            mainDiv.append(`<div class="row"><label>Bullets:</label><label class="bullets">${player.bullets}</label></div>`)

            let playButton = $('<button class="play">Play</button>').on('click', function () {
                let playerStats = $(this.parentNode)
                let playerId = playerStats.attr('data-id')
                let playerName = playerStats.find('label[class=name]').text()
                let playerMoney = playerStats.find('label[class=money]').text()
                let playerBullets = playerStats.find('label[class=bullets]').text()
                let player = {
                    name: playerName,
                    bullets: playerBullets,
                    money: Number(playerMoney)
                }
                savePlayerStats(playerId, player)
                loadCanvas(player)
                $('#canvas').css('display', 'block')
                $('#save').css('display', 'block')
                $('#reload').css('display', 'block')
                $('#save').on('click', function () {
                    savePlayerStats(playerId, player)
                    getPlayers()
                })
                $('#reload').on('click', function () {
                    player.bullets = 6
                })


            })

            let deleteButton = $('<button class="delete">Delete</button>').on('click', function () {
                deletePlayer(player._id)
            })

            mainDiv.append(playButton)
            mainDiv.append(deleteButton)
            playersSection.append(mainDiv)
        }
    })
}

function savePlayerStats(id, player) {
    $.ajax({
        method: 'PUT',
        url: `https://baas.kinvey.com/appdata/kid_HkS3mio9G/players/${id}`,
        headers: AUTH_HEADERS,
        data: player
    }).then((res) => {
        console.log(res)
    }).catch((err) => console.log(err))
}

function deletePlayer(id) {
    $.ajax({
        method: 'DELETE',
        url: `https://baas.kinvey.com/appdata/kid_HkS3mio9G/players/${id}`,
        headers: AUTH_HEADERS
    }).then(getPlayers).catch((err) => console.log(err))
}
