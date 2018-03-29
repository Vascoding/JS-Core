const BASE_URL = 'https://baas.kinvey.com/'
const APP_KEY = 'kid_BJU6xi99f'
const APP_SECRET = '29d4789a799640cfbf45ce3b2cc8b092'
const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)}
const BOOKS_PER_PAGE = 10

function loginUser() {
    let username = $('#formLogin input[name=username]').val()
    let password = $('#formLogin input[name=passwd]').val()
    $.ajax({
        method: 'POST',
        url: BASE_URL + 'user/' + APP_KEY + '/login',
        headers: AUTH_HEADERS,
        data: {username, password}
    }).then(function (res) {
        signInUser(res, 'Login successful.')
    }).catch(handleAjaxError)
    // POST -> BASE_URL + 'user/' + APP_KEY + '/login'
    // signInUser(res, 'Login successful.')
}

function registerUser() {
    let username = $('#formRegister input[name=username]').val()
    let password = $('#formRegister input[name=passwd]').val()
    $.ajax({
        method: 'POST',
        url: BASE_URL + 'user/' + APP_KEY + '/',
        headers: AUTH_HEADERS,
        data: {username, password}
    }).then(function (res) {
        signInUser(res, 'Register successfully')
    }).catch(handleAjaxError)
    // POST -> BASE_URL + 'user/' + APP_KEY + '/'
    // signInUser(res, 'Registration successful.')
}

function listBooks() {
    $.ajax({
        url: BASE_URL + 'appdata/' + APP_KEY + '/books',
        headers: {'Authorization': `Kinvey ${sessionStorage.getItem('authToken')}`}
    }).then(function (res) {
        displayPaginationAndBooks(res.reverse())
    }).catch(handleAjaxError)
    // GET -> BASE_URL + 'appdata/' + APP_KEY + '/books'
    // displayPaginationAndBooks(res.reverse())
}


function createBook() {
    let title = $('#formCreateBook input[name=title]').val()
    let author = $('#formCreateBook input[name=author]').val()
    let description = $('#formCreateBook textarea[name=description]').val()
    let userId = sessionStorage.getItem('userId')
    $.ajax({
        method: 'POST',
        url: BASE_URL + 'appdata/' + APP_KEY + '/books',
        headers: {'Authorization': `Kinvey ${sessionStorage.getItem('authToken')}`},
        data: {title, author, description, userId}
    }).then(listBooks).catch(handleAjaxError)
    // POST -> BASE_URL + 'appdata/' + APP_KEY + '/books'
    // showInfo('Book created.')
}

function deleteBook(book) {
    $.ajax({
        method: 'DELETE',
        url: BASE_URL + 'appdata/' + APP_KEY + '/books/' + book._id,
        headers: {'Authorization': `Kinvey ${sessionStorage.getItem('authToken')}`}
    }).then(listBooks).catch(handleAjaxError)
    // DELETE -> BASE_URL + 'appdata/' + APP_KEY + '/books/' + book._id
    // showInfo('Book deleted.')
}

function loadBookForEdit(book) {
    showEditBookView()
    $('#formEditBook input[name=id]').val(book._id)
    $('#formEditBook input[name=title]').val(book.title)
    $('#formEditBook input[name=author]').val(book.author)
    $('#formEditBook textarea[name=description]').val(book.description)
}

function editBook() {
    let id = $('#formEditBook input[name=id]').val()
    let title = $('#formEditBook input[name=title]').val()
    let author = $('#formEditBook input[name=author]').val()
    let description = $('#formEditBook textarea[name=description]').val()
    let userId = sessionStorage.getItem('userId')
    $.ajax({
        method: 'PUT',
        url: BASE_URL + 'appdata/' + APP_KEY + '/books/' + id,
        headers: {'Authorization': `Kinvey ${sessionStorage.getItem('authToken')}`},
        data: {title, author, description, userId}
    }).then(listBooks).catch(handleAjaxError)
    // PUT -> BASE_URL + 'appdata/' + APP_KEY + '/books/' + book._id
    // showInfo('Book edited.')
}

function saveAuthInSession(userInfo) {
    sessionStorage.setItem('username', userInfo.username)
    sessionStorage.setItem('authToken', userInfo._kmd.authtoken)
    sessionStorage.setItem('userId', userInfo._id)
}

function logoutUser() {
    sessionStorage.clear()
    $('#loggedInUser').text('')
    showHomeView()
    showHideMenuLinks()
    showInfo('Logout successful.')
}

function signInUser(res, message) {
    saveAuthInSession(res)
    showHomeView()
    showHideMenuLinks()
    showInfo(message)
}

function displayPaginationAndBooks(books) {
    let pagination = $('#pagination-demo')
    if(pagination.data("twbs-pagination")){
        pagination.twbsPagination('destroy')
    }
    pagination.twbsPagination({
        totalPages: Math.ceil(books.length / BOOKS_PER_PAGE),
        visiblePages: 5,
        next: 'Next',
        prev: 'Prev',
        onPageClick: function (event, page) {
            showView('viewBooks')
            let divBooks = $('#books')
            divBooks.empty()
            let booksTable = $('<table>')
            let firstTr = $('<tr>')
            firstTr.append('<th>Title</th>')
            firstTr.append('<th>Author</th>')
            firstTr.append('<th>Description</th>')
            firstTr.append('<th>Actions</th>')
            booksTable.append(firstTr)
            divBooks.append(booksTable)

            let startBook = (page - 1) * BOOKS_PER_PAGE
            let endBook = Math.min(startBook + BOOKS_PER_PAGE, books.length)
            $(`a:contains(${page})`).addClass('active')
            for (let i = startBook; i < endBook; i++) {
                let tr = $('<tr>')
                tr.append(`<td>${books[i].title}</td>`)
                tr.append(`<td>${books[i].author}</td>`)
                tr.append(`<td>${books[i].description}</td>`)
                if (books[i].userId === sessionStorage.getItem('userId')) {
                    let deleteButton = $(`<a href="#">[Delete]</a>`).on('click', function () {
                        deleteBook(books[i])
                    })
                    let editButton = $(`<a href="#">[Edit]</a>`).on('click', function () {
                        loadBookForEdit(books[i])
                    })
                    let td = $('<td>')
                    td.append(editButton)
                    td.append(deleteButton)
                    tr.append(td)
                }
                booksTable.append(tr)
            }
        }
    })
}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response)
    if (response.readyState === 0)
        errorMsg = "Cannot connect due to network error."
    if (response.responseJSON && response.responseJSON.description)
        errorMsg = response.responseJSON.description
    showError(errorMsg)
}