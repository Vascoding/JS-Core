function validityChecker(args) {
    let x1 = args[0],
        y1 = args[1],
        x2 = args[2],
        y2 = args[3]

    function distanceToPoints(x1, y1, x2, y2) {
        let distance = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))
        return distance
    }

    let first = distanceToPoints(x1, y1, 0, 0)
    let second = distanceToPoints(x2, y2, 0, 0)
    let third = distanceToPoints(x1, y1, x2, y2)
    if (first === parseInt(first, 10)) {
        console.log(`{${x1}, ${y1}} to {0, 0} is valid`)
    } else {
        console.log(`{${x1}, ${y1}} to {0, 0} is invalid`)
    }
    if (second === parseInt(second, 10)) {
        console.log(`{${x2}, ${y2}} to {0, 0} is valid`)
    } else {
        console.log(`{${x2}, ${y2}} to {0, 0} is invalid`)
    }
    if (third === parseInt(third, 10)) {
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is valid`)
    } else {
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`)
    }

}

validityChecker([2, 1, 1, 1])