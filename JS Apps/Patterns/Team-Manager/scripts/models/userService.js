let userService = (() => {
    function getTeamMembers(teamId) {
        return requester.get('user', `?query={"teamId": "${teamId}"}`, 'kinvey');
    }

    return {
        getTeamMembers,
    }
})()