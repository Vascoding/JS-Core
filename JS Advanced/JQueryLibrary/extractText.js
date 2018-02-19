function extractText() {
    let res = []
    $('li').each((i, el) => res.push(el.textContent))
    $('#result').text(res.join(', '))
}