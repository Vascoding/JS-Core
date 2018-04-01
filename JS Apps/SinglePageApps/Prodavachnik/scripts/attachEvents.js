function attachAllEvents() {
    $("#linkHome").on('click', showHomeView)
    $("#linkLogin").on('click', showLoginView)
    $("#linkRegister").on('click', showRegisterView)
    $("#linkListAds").on('click', listAds)
    $("#linkCreateAd").on('click', showCreateAdView)
    $("#linkLogout").on('click', logoutUser)

    $("#buttonLoginUser").on('click', loginUser)
    $("#buttonRegisterUser").on('click', registerUser)
    $("#buttonCreateAd").on('click', createAd)
    $("#buttonEditAd").on('click', editAd)

    $("#infoBox, #errorBox").on('click', function() {
        $(this).fadeOut()
    })

    $(document).on({
        ajaxStart: function() { $("#loadingBox").show() },
        ajaxStop: function() { $("#loadingBox").hide() }
    })
}