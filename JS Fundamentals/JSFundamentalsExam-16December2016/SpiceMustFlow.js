function spiceMustFlow(spice) {
    spice = Number(spice)
    let totalSpice = 0
    let days = 0
    while (true){
        if (spice < 100) {
            if (totalSpice < 26) {
                totalSpice = 0
            } else {
                totalSpice -= 26
            }

            break
        }
        totalSpice += spice
        if (totalSpice < 26) {
            totalSpice = 0
        } else {
            totalSpice -= 26
        }

        spice-= 10
        days++
    }

    console.log(days)
    console.log(totalSpice)
}

spiceMustFlow('450')