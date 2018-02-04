function lowestPrice(arr) {
    let products = new Map()

    for (let i = 0; i < arr.length; i++) {
        let splited = arr[i].split(/[|]/).filter(s => s !== '')
        let product = splited[1],
            town = splited[0],
            price = splited[2]

        if (!products.has(product)) {
            products.set(product, new Map())
        }
        products.get(product).set(town, Number(price))
    }

    for (let [product, towns] of products) {
        let minPrice = Number.MAX_VALUE;
        let minPriceTown = '';
        for (let [town, price] of towns) {
            if (price < minPrice) {
                minPrice = price;
                minPriceTown = town;
            }
        }

        console.log(`${product}-> ${minPrice} (${minPriceTown.trim()})`);
    }
}

lowestPrice(['Sofia City | BMW | 100000',
    'Mexico City | BMW | 99999',])
