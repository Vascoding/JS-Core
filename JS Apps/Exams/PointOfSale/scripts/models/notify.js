let notify = (() => {
    function handleError(reason) {
        showError(reason.responseJSON.description)
    }

    function showInfo(message) {
        let infoBox = $('#infoBox')
        infoBox.find('span').text(message)
        infoBox.show()
        setTimeout(() => infoBox.fadeOut(), 3000)
    }

    function showError(message) {
        let errorBox = $('#errorBox')
        errorBox.find('span').text(message)
        errorBox.show()
        setTimeout(() => errorBox.fadeOut(), 3000)
    }

    $(document).on({
        ajaxStart: function() { $("#loadingBox").show()},
        ajaxStop: function() { $("#loadingBox").hide()}
    })

    return {
        showInfo,
        showError,
        handleError,
    }
})()