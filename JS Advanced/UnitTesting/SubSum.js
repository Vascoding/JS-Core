function subSum(arr, startIndex, endIndex) {
    if (!Array.isArray(arr)) {
        return NaN
    }

    for (let i = 0; i < arr.length; i++) {
        if (!Number(arr[i])) {
            return NaN
        }
    }

    if (startIndex < 0) {
        startIndex = 0
    }

    if (endIndex > arr.length - 1) {
        endIndex = arr.length - 1
    }
    let sum = 0
    for (let i = startIndex; i <= endIndex; i++) {
        sum += arr[i]
    }

    return sum
}

console.log(subSum([10, 'twenty', 30, 40], 3, 300))