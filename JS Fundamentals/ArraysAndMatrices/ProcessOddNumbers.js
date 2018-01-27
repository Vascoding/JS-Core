function processOdd(arr) {
    console.log(arr.filter((num, i) => i % 2 !== 0)
        .map(n => n * 2)
        .reverse().join(' '))

}

processOdd([10, 15, 20, 25])