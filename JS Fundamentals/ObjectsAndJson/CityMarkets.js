function cityMarkets(args) {
    let towns = new Map()

    for (let i = 0; i < args.length; i++) {
        let splited = args[i].split(/[->:]/).filter(s => s !== '')
        let town = splited[0],
            product = splited[1],
            amountOfSales = splited[2],
            priceForOneUnit = splited[3]
        if (!towns.has(town)) {
            towns.set(town, new Map())
        }
        let income = amountOfSales * priceForOneUnit
        let hasIncome = towns.get(town).get(product)
        if (hasIncome) {
            income += hasIncome
        }
        towns.get(town).set(product, income)
    }

    for (let [key, values] of towns) {
        console.log(`Town - ${key}`)
        for (let [key, value] of values){
            console.log(`$$$${key.trim()} : ${value}`)
        }
    }
}

cityMarkets(['Sofia -> Laptops HP -> 200 : 2000',
'Sofia -> Raspberry -> 200000 : 1500',
'Sofia -> Audi Q7 -> 200 : 100000',
'Montana -> Portokals -> 200000 : 1',
'Montana -> Qgodas -> 20000 : 0.2',
'Montana -> Chereshas -> 1000 : 0.3'])