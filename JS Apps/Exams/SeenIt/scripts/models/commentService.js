let commentService = (() => {
    function getPostComments(postId) {
        return requester.get('appdata', `comments?query={"postId":"${postId}"}&sort={"_kmd.ect": -1}`, 'kinvey')
    }

    function postComment(postId, content) {
        let author = sessionStorage.getItem('username')
        let data = {
            postId,
            content,
            author
        }
        return requester.post('appdata', `comments`, 'kinvey', data)
    }

    function deleteComment(commentId) {
        return requester.remove('appdata', `comments/${commentId}`, 'kinvey')
    }

    return {
        getPostComments,
        postComment,
        deleteComment,
    }
})()