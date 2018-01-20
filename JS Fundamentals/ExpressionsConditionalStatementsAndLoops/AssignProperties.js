function assignProperties(args) {
    var first = args[0],
        second = args[2],
        third = args[4]

    let obj = {}
    obj[first] = args[1]
    obj[second] = args[3]
    obj[third] = args[5]


    console.log(obj)
}

assignProperties(['name', 'Pesho', 'age', '23', 'gender', 'male'])