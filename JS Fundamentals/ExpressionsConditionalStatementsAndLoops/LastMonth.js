function lastMonth(args) {
    let day = args[0],
        month = args[1],
        year = args[2]

    let date = new Date(year, month - 1, 0)
    console.log(date.getDate())
}

lastMonth([17, 3, 2002])