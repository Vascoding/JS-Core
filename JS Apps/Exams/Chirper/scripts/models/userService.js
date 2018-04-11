let userService = (() => {
    function getSubscriptions() {
        return requester.get('user', `${sessionStorage.getItem('userId')}`, 'kinvey');
    }

    function getFollowers() {
        return requester.get('user', `?query={"subscriptions":"${sessionStorage.getItem('username')}"}`, 'kinvey');
    }

    function getUserFollowers(username) {
        return requester.get('user', `?query={"subscriptions":"${username}"}`, 'kinvey');
    }

    function getFollowing() {
        return requester.get('user', `?query={"username":"${sessionStorage.getItem('username')}"}`, 'kinvey');
    }

    function loadAllUsers() {
        return requester.get('user', ``, 'kinvey');
    }

    function getUserById() {
        return requester.get('user', `${sessionStorage.getItem('userId')}`, 'kinvey')
    }

    function updateUserFollowing(data) {
        return requester.update('user', `${sessionStorage.getItem('userId')}`, 'kinvey', data)
    }

    return {
        getSubscriptions,
        getFollowers,
        getFollowing,
        loadAllUsers,
        getUserFollowers,
        getUserById,
        updateUserFollowing,
    }
})()