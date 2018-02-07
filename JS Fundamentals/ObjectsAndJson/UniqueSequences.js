function uniqueSequences(arr) {
    let ordered = new Map()
    let mySort = (first, second, map) => map.get(first) - map.get(second)
    for (let i = 0; i < arr.length; i++) {
        let array = JSON.parse(arr[i]).map(Number).sort((a, b) => b - a)
        let toStore = `[${array.join(', ')}]`
        if (!ordered.has(toStore)) {
            ordered.set(toStore, array.length)
        }
    }

    let sorted = []
    for (let key of Array.from(ordered.keys()).sort((a, b) => mySort(a, b, ordered))) {
        sorted.push(key)
    }
    console.log(sorted.join('\n'))
}

uniqueSequences(['[-3, -2, -1, 0, 1, 2, 3, 4]',
    '[10, 1, -17, 0, 2, 13]',
    '[4, -3, 3, -2, 2, -1, 1, 0]'])