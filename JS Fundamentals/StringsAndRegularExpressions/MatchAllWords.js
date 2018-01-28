function matchWords(str) {
    let regex = /\w+/g;
    let words = []

    while (true){
        let word = regex.exec(str)
        if (!word) {
            break
        }
        words.push(word[0])
    }
    console.log(words.join('|'))
}

matchWords('A Regular Expression needs to have the global flag in order to match all occurrences in the text')