function biggestElement(matrix) {
    let max = Number.NEGATIVE_INFINITY
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (max < matrix[row][col]) {
                max = matrix[row][col]
            }
        }
    }
    console.log(max)
}

biggestElement([[3, 5, 7, 12],
    [-1, 4, 33, 2],
    [8, 3, 0, 4]]
)