function search() {
    let searchTerm = $('#searchText').val()
    let lists = $('ul#towns li')
    let count = 0
    for (let li of lists) {
        if (li.textContent.includes(searchTerm)) {
            $(li).css("font-weight", "bold");
            count++
        } else {
            $(li).css("font-weight", "");
        }
    }
    $('#result').text(count + " matches found.")
}
