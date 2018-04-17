let userService = (() => {
    function getLoggedInUser() {
        return requester.get('user', sessionStorage.getItem('userId'), 'kinvey')
    }

    return {
        getLoggedInUser,
    }
})()