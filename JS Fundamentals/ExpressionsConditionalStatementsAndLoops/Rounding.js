function rounding(args) {
    let value = args[0],
        precision = args[1]

    if (precision > 15){
        precision = 15
    }
    value = value.toFixed(precision)
    while (value.toString().endsWith('0')) {
        value = value.toString().replace('0', '')
    }
    console.log(value)
}

rounding([10.5, 3])
