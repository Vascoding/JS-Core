function attachEvents() {
    let posts = []

    $('#btnLoadPosts').on('click', function () {
        $.ajax({
            method: 'GET',
            url: 'https://baas.kinvey.com/appdata/kid_Sykfw2z5z/posts',
            async: true,
            success: function (res) {
                let select = $('#posts')
                select.empty()
                for (let key in res) {
                    posts.push({
                        id: res[key]['_id'],
                        title: res[key]['title'],
                        body: res[key]['body']
                    })
                    select.append(`<option value="${res[key]['_id']}">${res[key]['title']}</option>`)
                }
            },
            error: function (err) {
                console.log(err)
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic " + btoa('evil' + ":" + 'galiba'));
            },
        })

    })

    $('#btnViewPost').on('click', function () {
        let postId = $('#posts').find('option:selected').val()
        let post = posts.find(p => p.id === postId)
        $('#post-title').text(`${post['title']}`)
        $('#post-body').text(`${post['body']}`)
        $.ajax({
            method: 'GET',
            url: `https://baas.kinvey.com/appdata/kid_Sykfw2z5z/comments/?query={"post_id":"${postId}"}`,
            async: true,
            success: function (res) {
                let comments = $('#post-comments')
                comments.empty()
                for (let key in res) {
                    comments.append(`<li>${res[key]['text']}</li>`)
                }
            },
            error: function (err) {
                console.log(err)
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic " + btoa('evil' + ":" + 'galiba'));
            },
        })
    })
}