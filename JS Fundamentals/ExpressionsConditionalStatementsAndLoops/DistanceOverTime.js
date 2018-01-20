function distanceOverTime(args) {
    let firstSpeed = args[0],
        secondSpeed = args[1],
        time = (args[2] / 60) / 60

    let firstDistance = firstSpeed * time
    let secondDistance = secondSpeed * time

    let diff = Math.abs(firstDistance - secondDistance)

    console.log(diff * 1000)
}

distanceOverTime([11, 10, 120])