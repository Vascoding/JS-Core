function airPollution(matrixArgs, forces) {
    let matrix = []

    for (let i = 0; i < matrixArgs.length; i++) {
        let splited = matrixArgs[i].split(/\s+/).filter(s => s !== '')
        matrix[i] = new Array(5)
        for (let j = 0; j < splited.length; j++) {
            matrix[i][j] = Number(splited[j])
        }
    }

    for (let i = 0; i < forces.length; i++) {
        let splitedForces = forces[i].split(/\s+/).filter(s => s !== '')
        let force = splitedForces[0]
        let index = Number(splitedForces[1])
        if (force === 'breeze') {
            for (let j = 0; j < matrix[index].length; j++) {
                if (matrix[index][j] < 15) {
                    matrix[index][j] = 0
                } else {
                    matrix[index][j] -= 15
                }
            }
        }
        if (force === 'gale') {
            for (let j = 0; j < matrix.length; j++) {
                if (matrix[j][index] < 20) {
                    matrix[j][index] = 0
                } else {
                    matrix[j][index] -= 20
                }
            }
        }
        if (force === 'smog') {
            for (let j = 0; j < matrix.length; j++) {
                for (let k = 0; k < matrix.length; k++) {
                    matrix[j][k] += index
                }
            }
        }
    }
    let pollutedAreas = []
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j] >= 50) {
                pollutedAreas.push(`[${i}-${j}]`)
            }
        }
    }
    if (pollutedAreas.length === 0) {
        console.log('No polluted areas')
    } else {
        console.log(`Polluted areas: ${pollutedAreas.join(', ')}`)
    }
}

airPollution([
        "5 7 72 14 4",
        "41 35 37 27 33",
        "23 16 27 42 12",
        "2 20 28 39 14",
        "16 34 31 10 24",
    ],
    ["breeze 1", "gale 2", "smog 25"])