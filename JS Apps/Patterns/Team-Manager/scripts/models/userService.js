let userService = (() => {
    function getTeamMembers() {
        return requester.get('user', '', 'kinvey');
    }

    return {
        getTeamMembers,
    }
})()