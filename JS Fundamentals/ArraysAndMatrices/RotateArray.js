function rotateArray(arr) {
    let rotations = arr.pop() % arr.length
    for (let i = 0; i < rotations; i++) {
        arr.unshift(arr.pop())
    }

    console.log(arr.join(' '))
}

rotateArray([1, 2, 3, 4, 7])