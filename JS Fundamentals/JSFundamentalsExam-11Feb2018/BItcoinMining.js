function mine(arr) {
    let firstDay = 0
    let bitCoins = 0
    let totalAmount = 0
    let lvForGram = 67.51
    let lvForBitCoin = 11949.16
    let isFirst = true
    for (let i = 0; i < arr.length; i++) {
        let goldInGrams = Number(arr[i])

        if ((i + 1) % 3 === 0) {
            goldInGrams -= goldInGrams * 0.3
        }
        totalAmount += goldInGrams * lvForGram
        while (totalAmount >= lvForBitCoin){
            if (isFirst) {
                firstDay = i + 1
                isFirst = false
            }
            totalAmount -= lvForBitCoin
            bitCoins++
        }
    }

    console.log(`Bought bitcoins: ${bitCoins}`)
    if (firstDay !== 0) {
        console.log(`Day of the first purchased bitcoin: ${firstDay}`)
    }
    console.log(`Left money: ${totalAmount.toFixed(2)} lv.`)
}

mine(['50', '100'])