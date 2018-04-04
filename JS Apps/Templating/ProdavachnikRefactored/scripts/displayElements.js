function showView(viewName) {
    $('main > section').hide()
    $('#' + viewName).show()
}

async function showHideMenuLinks() {
    let headers = window.headers.guestHeaders
    if (sessionStorage.getItem('authToken') !== null) {
        headers = window.headers.authHeaders
    }
    let source = await $.get('./templates/headers.hbs')
    let template = Handlebars.compile(source)

    let h = template({headers})
    $('#app').empty()
    $('#app').append(h)
    attachLinkEvents()
}

function showInfo(message) {
    let infoBox = $('#infoBox')
    infoBox.text(message)
    infoBox.show()
    setTimeout(function () {
        $('#infoBox').fadeOut()
    }, 3000)
}

function showError(errorMsg) {
    let errorBox = $('#errorBox')
    errorBox.text("Error: " + errorMsg)
    errorBox.show()
}

function showHomeView() {
    showView('viewHome')
}

function showLoginView() {
    $('#formLogin').trigger('reset')
    showView('viewLogin')
}

function showRegisterView() {
    $('#formRegister').trigger('reset')
    showView('viewRegister')
}

function showAdsView() {
    showView('viewAds')
}

function showCreateAdView() {
    $('#formCreateAd').trigger('reset')
    showView('viewCreateAd')
}

function showEditAdView(ad) {
    showView('viewEditAd')
    $('#formEditAd input[name=id]').val(ad._id)
    $('#formEditAd input[name=publisher]').val(ad.publisher)
    $('#formEditAd input[name=title]').val(ad.title)
    $('#formEditAd textarea[name=description]').val(ad.description)
    $('#formEditAd input[name=datePublished]').val(ad.published)
    $('#formEditAd input[name=price]').val(ad.price)
    $('#formEditAd input[name=image]').val(ad.image)
    $('#formEditAd input[name=views]').val(ad.views)
}

function showReadMoreView(ad) {
    showView('viewReadMore')
    $('#readMore div[name=image]').empty()
    $('#readMore div[name=image]').append(`<img width="400px" src="${ad.image}" />`)
    $('#readMore h1[name=title]').text(ad.title)
    $('#readMore p[name=description]').text(ad.description)
    $('#readMore div[name=datePublished]').text(ad.published)
    $('#readMore div[name=publisher]').text(ad.publisher)
    $('#readMore div[name=views]').text(`Views: ${++ad.views}`)
}