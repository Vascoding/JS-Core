let userService = (() => {
    function getLoggedInUser() {
        return requester.get('user', sessionStorage.getItem('userId'), 'kinvey')
    }

    function purchaseProduct(data) {
        return requester.update('user', sessionStorage.getItem('userId'), 'kinvey', data)
    }

    function discardProduct(data) {
        return requester.update('user', sessionStorage.getItem('userId'), 'kinvey', data)
    }
    return {
        getLoggedInUser,
        purchaseProduct,
        discardProduct,
    }
})()