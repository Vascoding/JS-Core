function extractText(str) {
    let extract = []
    while (true){
        let start = str.indexOf('(')
        let end = str.indexOf(')')
        if (start < 0 || end < 0 || start > end) {
            break
        } else {
            extract.push(str.substring(start + 1, end))
        }
        str = str.substring(end + 1)
    }

    console.log(extract.join(', '))
}

extractText('Rakiya (Bulgarian brandy) is self-made liquor (alcoholic drink)')