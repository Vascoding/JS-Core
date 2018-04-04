(function () {
    class Header {
        constructor(id, name) {
            this.id = id
            this.name = name
        }
    }

    let guestHeaders = [
        new Header('linkHome', 'Home'),
        new Header('linkLogin', 'Login'),
        new Header('linkRegister', 'Register'),
    ]
    let authHeaders = [
        new Header('linkHome', 'Home'),
        new Header('linkListAds', 'List Advertisements'),
        new Header('linkCreateAd', 'Create Advertisement'),
        new Header('linkLogout', 'Logout'),
    ];

    window.headers = {
        guestHeaders: guestHeaders,
        authHeaders: authHeaders
    }
})()