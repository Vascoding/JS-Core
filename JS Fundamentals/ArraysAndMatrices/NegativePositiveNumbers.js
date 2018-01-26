function negativePositiveNumbers(arr) {
    let filtered = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            filtered.unshift(arr[i])
        } else {
            filtered.push(arr[i])
        }
    }
    console.log(filtered)
}

negativePositiveNumbers([7, -2, 8, 9])