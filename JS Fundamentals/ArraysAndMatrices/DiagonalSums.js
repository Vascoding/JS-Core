function diagonalSums(matrix) {
    let firstSum = 0
    let secondSum = 0
    for (let row = 0; row < matrix.length; row++) {
        firstSum += matrix[row][row]
        secondSum += matrix[row][matrix.length - 1 - row]
    }

    console.log(firstSum + ' ' + secondSum)
}

diagonalSums([[20, 40],
    [10, 60]]

)