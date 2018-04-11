let postService = (() => {
    function getAllPosts() {
        return requester.get('appdata', 'posts?query={}&sort={"_kmd.ect": -1}', 'kinvey')
    }

    function getPost(postId) {
        return requester.get('appdata', `posts/${postId}`, 'kinvey')
    }

    function createPost(title, description, url, imageUrl) {
        let author = sessionStorage.getItem('username')
        let data = {
            title,
            description,
            url,
            imageUrl,
            author
        }
        return requester.post('appdata', `posts`, 'kinvey', data)
    }

    function editPost(postId, title, description, url, imageUrl) {
        let author = sessionStorage.getItem('username')
        let data = {
            title,
            description,
            url,
            imageUrl,
            author
        }
        return requester.update('appdata', `posts/${postId}`, 'kinvey', data)
    }

    function deletePost(postId) {
        return requester.remove('appdata', `posts/${postId}`, 'kinvey')
    }

    return {
        getAllPosts,
        getPost,
        createPost,
        editPost,
        deletePost
    }
})()