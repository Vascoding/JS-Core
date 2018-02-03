function populationsInTown(arr) {
    let obj = new Map()

    for (let i = 0; i < arr.length; i++) {
        let splited = arr[i].split(/[<\->]+/).filter(s => s !== '')
        let town = splited[0].trim()
        let population = Number(splited[1].trim())
        if (obj.has(town)) {
            obj.set(town, obj.get(town) + population)
        } else {
            obj.set(town, population)
        }
    }
    for (let [town, sum] of obj){
        console.log(town + ' : ' + sum)
    }
}

populationsInTown(['Sofia <-> 1200000',
'Montana <-> 20000',
'New York <-> 10000000',
'Washington <-> 2345000',
'Las Vegas <-> 1000000',
    'Sofia <-> 1200000'])