let chirpService = (() => {
    function loadChirpsByUser(username) {
        return requester.get('appdata', `chirps?query={"author": "${username}"}`, 'kinvey')
    }

    function createChirp(text, author) {
        let data = {
            text,
            author
        }
        return requester.post('appdata', `chirps`, 'kinvey', data)
    }

    function deleteChirp(chirpId) {
        return requester.remove('appdata', `chirps/${chirpId}`, 'kinvey')
    }

    return {
        loadChirpsByUser,
        createChirp,
        deleteChirp,
    }
})()