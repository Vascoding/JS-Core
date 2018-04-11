let userService = (() => {
    function getUserPosts() {
        let username = sessionStorage.getItem('username')
        return requester.get('appdata', `posts?query={"author":"${username}"}&sort={"_kmd.ect": -1}`, 'kinvey')
    }
    return {
        getUserPosts,
    }
})()