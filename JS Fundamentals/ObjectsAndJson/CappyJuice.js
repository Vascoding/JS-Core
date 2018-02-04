function formBottles(arr) {
    let juices = new Map()
    let obtained = new Map()
    for (let i = 0; i < arr.length; i++) {
        let [juice, amount] = arr[i].split(' => ')
        amount = Number(amount)
        if (!juices.has(juice)) {
            juices.set(juice, amount)
            if (amount >= 1000) {
                obtained.set(juice, amount)
            }
        } else {
            let sum = juices.get(juice) + amount
            juices.set(juice, sum)
            if (sum >= 1000) {
                obtained.set(juice, sum)
            }
        }


    }
    for (let [key, value] of obtained) {
        console.log(key + " => " + parseInt(value / 1000))
    }
}

formBottles(['Kiwi => 234',
    'Pear => 2345',
    'Watermelon => 3456',
    'Kiwi => 4567',
    'Pear => 5678',
    'Watermelon => 6789'])