function evenPositionElement(arr) {
    let even = []

    for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 0) {
            even.push(arr[i])
        }
    }
    console.log(even.join(' '))
}

evenPositionElement(['20', '30', '40'])