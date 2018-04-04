function attachLinkEvents() {
    $("#linkHome").on('click', function () {
        if (window.requestRunning === true) {
            return
        }
        showHomeView()
    })
    $("#linkLogin").on('click', function () {
        if (window.requestRunning === true) {
            return
        }
        showLoginView()
    })
    $("#linkRegister").on('click', function () {
        if (window.requestRunning === true) {
            return
        }
        showRegisterView()
    })
    $("#linkListAds").on('click', function () {
        if (window.requestRunning === true) {
            return
        }
        listAds()
    })
    $("#linkCreateAd").on('click', function () {
        if (window.requestRunning === true) {
            return
        }
        showCreateAdView()
    })
    $("#linkLogout").on('click', function () {
        if (window.requestRunning === true) {
            return
        }
        logoutUser()
    })


    $("#infoBox, #errorBox").on('click', function() {
        $(this).fadeOut()
    })

    $(document).on({
        ajaxStart: function() { $("#loadingBox").show(), window.requestRunning = true},
        ajaxStop: function() { $("#loadingBox").hide(), window.requestRunning = false}
    })
}

function attachBtnEvents() {
    $("#buttonLoginUser").on('click', loginUser)
    $("#buttonRegisterUser").on('click', registerUser)
    $("#buttonCreateAd").on('click', createAd)
    $("#buttonEditAd").on('click', editAd)
}