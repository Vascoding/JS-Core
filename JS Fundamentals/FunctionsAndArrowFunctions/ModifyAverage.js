function modifyAverage(num) {
    let average = findAverage(num.toString())
    if (average > 5) {
        console.log(num)
        return
    }
    let modified = num.toString()
    while (average <= 5) {
        modified = modified + '9'
        average = findAverage(modified)
    }
    console.log(modified)

    function findAverage(num) {
        let sum = 0
        for (let i = 0; i < num.length; i++) {
            sum += Number(num[i])
        }

        return sum / num.length
    }
}

modifyAverage(5835)