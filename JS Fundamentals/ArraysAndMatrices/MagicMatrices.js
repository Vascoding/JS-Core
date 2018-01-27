function magicMatrices(matrix) {
    let magical = matrix[0].reduce((a, b) =>  a + b)

    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i].reduce((a, b) => a + b) !== magical) {
            return false
        }
        let sum = 0
        for (let j = 0; j < matrix.length; j++) {
            sum+= matrix[j][i]
        }
        if (sum !== magical) {
            return false
        }
    }
    return true
}

console.log(magicMatrices([[4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]]
));