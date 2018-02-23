function aggregate(arr) {
    console.log(`Sum = ${reduce(arr, (a, b) => a + b)}`)
    console.log(`Sum = ${reduce(arr, (a, b) => Math.min(a, b))}`)
    console.log(`Sum = ${reduce(arr, (a, b) => Math.max(a, b))}`)
    console.log(`Sum = ${reduce(arr, (a, b) => a * b)}`)
    console.log(`Sum = ${reduce(arr, (a, b) => '' + a + b)}`)

    function reduce(arr, func) {
        let result = arr[0]
        for (let nextElement of arr.slice(1))
            result = func(result, nextElement)
        return result
    }
}

aggregate([2, 3, 10, 5])