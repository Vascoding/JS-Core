function validate() {
    let usernameRegex = /^[a-zA-Z0-9]{3,20}$/g
    let passwordRegex = /^\w{5,15}$/g
    let emailRegex = /^[a-zA-Z]+@.+$/

    $('#submit').on('click', function (event) {
        event.preventDefault()
        let valid = true
        let username = $('#username').val()
        let email = $('#email').val()
        let password = $('#password').val()
        let confirmPassword = $('#confirm-password').val()
        if (!username.match(usernameRegex)) {
            $('div #username').attr('style', 'border-color: red;')
            valid = false
        } else {
            $('div #username').attr('style', 'border: ;')
        }

        if (!email.match(emailRegex) || !email.includes('.')) {
            $('div #email').attr('style', 'border-color: red;')
            valid = false
        } else {
            $('div #email').attr('style', 'border: ;')
        }

        if (!password.match(passwordRegex) || !confirmPassword.match(passwordRegex) || password !== confirmPassword) {
            $('div #password').attr('style', 'border-color: red;')
            $('div #confirm-password').attr('style', 'border-color: red;')
            valid = false
        } else {
            $('div #password').attr('style', 'border: ;')
            $('div #confirm-password').attr('style', 'border: ;')
        }

        if ($('#company').is(':checked')) {
            let companyNumber = $('#companyNumber').val()

            if (companyNumber < 1000 || companyNumber > 9999) {
                $('div #companyNumber').attr('style', 'border-color: red;')
                valid = false
            } else {
                $('div #companyNumber').attr('style', 'border: ;')
            }
        }

        if (valid) {
            $('div #valid').attr('style', 'display: block;')
        } else {
            $('div #valid').attr('style', 'display: none;')
        }
    })

    $("#company").on('click', show)

    function show() {
        if ($('#companyInfo').attr('style') === 'display: block;') {
            $('#companyInfo').attr('style', 'display: none;')

        } else {
            $('#companyInfo').attr('style', 'display: block;')
        }

    }
}
