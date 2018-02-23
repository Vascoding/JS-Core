let solution = (() => {
    return {
        add: (x, y) => [x[0] + y[0], x[1] + y[1]],
        multiply: (x, y) => [x[0] * y, x[1] * y],
        length: (l) => Math.sqrt((l[0] * l[0]) + (l[1] * l[1])),
        dot: (x, y) => (x[0] * y[0]) + (x[1] * y[1]),
        cross: (x, y) => (x[0] * y[1]) - (x[1] * y[0])
    }
})()


console.log(solution.add([5.43, -1], [1, 31]))
console.log(solution.dot([2, 3], [2, -1]))
