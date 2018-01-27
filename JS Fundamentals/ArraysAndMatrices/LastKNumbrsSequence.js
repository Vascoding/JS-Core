function lastKNumbers(n, k) {
    let seq = [1]

    for (let i = 1; i < n; i++) {
        let start = Math.max(0, seq.length - k);
        let sum = seq.slice(start, k + i).reduce((a, b) => {return a+b})
        seq[i] = sum
    }

    console.log(seq)

    let arr = [1, 2, 3, 4]

    console.log(arr.forEach((a, b) =>  a+b))
}

lastKNumbers(8, 2)