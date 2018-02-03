function countWords(arr) {
    let words = arr.join('').toLowerCase().split(/[^\w+]/).filter(w => w !== '')

    let myMap = new Map()

    for (let i = 0; i < words.length; i++) {
        if (myMap.has(words[i])) {
            myMap.set(words[i], myMap.get(words[i]) + 1)
        } else {
            myMap.set(words[i], 1)
        }
    }
    let allWords = Array.from(myMap.keys()).sort()
    for (let key of allWords){
        console.log(`'${key}'` + ' -> ' +  myMap.get(key) + ' times')
    }
}

countWords(['Far too slow, you\'re far too slow.'])