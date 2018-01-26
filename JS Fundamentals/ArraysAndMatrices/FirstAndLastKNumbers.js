function firstAndLast(arr) {
    let k = arr.shift()

    console.log(arr.slice(0, k).join(' '))
    console.log(arr.slice(arr.length - k).join(' '))
}

firstAndLast([3, 6, 7, 8, 9])