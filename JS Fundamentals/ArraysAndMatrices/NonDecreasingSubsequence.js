function nonDecreasing(args) {
    let previous = 0
    for (let i = 1; i < args.length; i++) {
        if (i === 1) {
            previous = args[i - 1]
            console.log(previous)
        }
        if (args[i] >= previous) {
            previous = args[i]
            console.log(previous)
        }
    }
}

nonDecreasing([1, 3, 2, 24, 2, 4, 25, 21, 26])