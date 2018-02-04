function heroicInventory(arr) {
    let inventory = []

    for (let i = 0; i < arr.length; i++) {
        let splited = arr[i].split(' / ').filter(s => s !== '')
        let hero = splited[0].trim(),
            level = Number(splited[1])

        let items = []
        if (splited.length > 2) {
            items = splited[2].split(/[\s*,\s*]+/).filter(s => s !== '')
        }


        inventory.push({name: hero, level: level, items: items})
    }

    console.log(JSON.stringify(inventory))
}

heroicInventory(['Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara'
])