function distanceIn3D(args) {
    let a = args[0],
        b = args[1],
        c = args[2],
        x = args[3],
        y = args[4],
        z = args[5]

    console.log(Math.sqrt(Math.pow((a - x), 2) + Math.pow((b - y), 2) + Math.pow((c - z), 2)))
}

distanceIn3D([3.5, 0, 1, 0, 2, -1])