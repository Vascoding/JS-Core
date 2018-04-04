const BASE_URL = 'https://baas.kinvey.com/'
const APP_KEY = 'kid_SyTuWM69M'
const URL_FOR_CRUD = BASE_URL + 'appdata/' + APP_KEY + '/advert'
const APP_SECRET = 'b786858b893c44f896da009f287ad675'
const BASIC_AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)}

function registerUser() {
    let username = $('#formRegister input[name=username]').val()
    let password = $('#formRegister input[name=passwd]').val()
    $.ajax({
        method: 'POST',
        url: BASE_URL + 'user/' + APP_KEY + '/',
        headers: BASIC_AUTH_HEADERS,
        data: {username, password}
    }).then(function (res) {
        signInUser(res, 'Register successfully')
    }).catch(handleAjaxError)
}

function loginUser() {
    let username = $('#formLogin input[name=username]').val()
    let password = $('#formLogin input[name=passwd]').val()
    $.ajax({
        method: 'POST',
        url: BASE_URL + 'user/' + APP_KEY + '/login',
        headers: BASIC_AUTH_HEADERS,
        data: {username, password}
    }).then(function (res) {
        signInUser(res, 'Login successful.')
    }).catch(handleAjaxError)

}


function logoutUser() {
    sessionStorage.clear()
    $('#loggedInUser').text('')
    showHomeView()
    showHideMenuLinks()
    showInfo('Logout successful.')
}

function signInUser(res, message) {
    saveAuthInSession(res)
    showHomeView()
    showHideMenuLinks()
    showInfo(message)
}

function saveAuthInSession(userInfo) {
    sessionStorage.setItem('username', userInfo.username)
    sessionStorage.setItem('authToken', userInfo._kmd.authtoken)
    sessionStorage.setItem('userId', userInfo._id)
}

function createAd() {
    let title = $('#formCreateAd input[name=title]').val()
    let description = $('#formCreateAd textarea[name=description]').val()
    let published = $('#formCreateAd input[name=datePublished]').val()
    let price = Number($('#formCreateAd input[name=price]').val())
    let image = $('#formCreateAd input[name=image]').val()
    let views = 0
    let publisher = sessionStorage.getItem('username')
    let advert = {title, description, published, price, publisher, image, views}
    $.ajax({
        method: 'POST',
        url: URL_FOR_CRUD,
        headers: {'Authorization': `Kinvey ${sessionStorage.getItem('authToken')}`},
        data: advert
    }).then(listAds)
        .catch(handleAjaxError)
}

function listAds() {
    $.ajax({
        url: URL_FOR_CRUD,
        headers: {'Authorization': `Kinvey ${sessionStorage.getItem('authToken')}`},
    }).then(fillData).catch(handleAjaxError)
}

function fillData(res) {
    let allAds = $('#ads')
    allAds.empty()
    showAdsView()
    let table = $('<table>')
    let firstTr = $('<tr>')
    firstTr.append('<th>Title</th>')
    firstTr.append('<th>Publisher</th>')
    firstTr.append('<th>Description</th>')
    firstTr.append('<th>Price</th>')
    firstTr.append('<th>Date Published</th>')
    table.append(firstTr)
    for (let advert of res) {
        let tr = $('<tr>')
        tr.append(`<td>${advert.title}</td>`)
        tr.append(`<td>${advert.publisher}</td>`)
        tr.append(`<td>${advert.description}</td>`)
        tr.append(`<td>${advert.price}</td>`)
        tr.append(`<td>${advert.published}</td>`)
        let buttons = $('<td>')
        let readMore = $(`<a href="#" data-id="${advert._id}">[Read More]</a>`).on('click', function () {
            incrementViews(advert)
        })
        buttons.append(readMore)
        if (advert.publisher === sessionStorage.getItem('username')) {
            let editButton = $(`<a href="#" data-id="${advert._id}">[Edit]</a>`).on('click', function () {
                showEditAdView(advert)
                console.log(advert)
            })
            let deleteButton = $(`<a href="#" data-id="${advert._id}">[Delete]</a>`).on('click', function () {
                deleteAd($(this.parentNode.parentNode).find('a').attr('data-id'))
            })
            buttons.append(editButton)
            buttons.append(deleteButton)

        }
        tr.append(buttons)
        table.append(tr)
    }
    allAds.append(table)
}

function deleteAd(id) {
    $.ajax({
        method: 'DELETE',
        url: URL_FOR_CRUD + `/${id}`,
        headers: {'Authorization': `Kinvey ${sessionStorage.getItem('authToken')}`},
    }).then(listAds).catch(handleAjaxError)
}

function editAd() {
    let id = $('#formEditAd input[name=id]').val()
    let publisher = $('#formEditAd input[name=publisher]').val()
    let title = $('#formEditAd input[name=title]').val()
    let description = $('#formEditAd textarea[name=description]').val()
    let published = $('#formEditAd input[name=datePublished]').val()
    let price = Number($('#formEditAd input[name=price]').val())
    let image = $('#formEditAd input[name=image]').val()
    let views = $('#formEditAd input[name=views]').val()
    let ad = {title, description, published, publisher, price, image, views}

    $.ajax({
        method: 'PUT',
        url: URL_FOR_CRUD + `/${id}`,
        headers: {'Authorization': `Kinvey ${sessionStorage.getItem('authToken')}`},
        data: ad
    }).then(listAds).catch(handleAjaxError)
}

function incrementViews(ad) {
    $.ajax({
        method: 'GET',
        url: URL_FOR_CRUD + `/${ad._id}`,
        headers: {'Authorization': `Kinvey ${sessionStorage.getItem('authToken')}`},
    }).then(() => showReadMoreView(ad)).catch(handleAjaxError)
}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response)
    if (response.readyState === 0)
        errorMsg = "Cannot connect due to network error."
    if (response.responseJSON && response.responseJSON.description)
        errorMsg = response.responseJSON.description
    showError(errorMsg)
}

