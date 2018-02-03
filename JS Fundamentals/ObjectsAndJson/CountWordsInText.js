function countWordsInText(arr) {
    let words = arr.join('').split(/[^\w+]/).filter(w => w !== '')

    let obj = {}

    for (let i = 0; i < words.length; i++) {
        if (obj.hasOwnProperty(words[i])) {
            obj[words[i]]++
        } else {
            obj[words[i]] = 1
        }
    }
    console.log(JSON.stringify(obj))
}

countWordsInText(['Far too slow, you\'re far too slow.'])