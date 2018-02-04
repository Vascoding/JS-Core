function store(arr) {
    let catalogue = arr.sort()

    let symbol = catalogue[0][0]
    console.log(`${symbol}`)
    for (let product of catalogue){
        if (product[0] === symbol) {
            console.log('  ' + product.split(' :').join(':'))
        } else {
            symbol = product[0]
            console.log(symbol)
            console.log('  ' + product.split(' :').join(':'))
        }
    }
}

store(['Banana : 2',
'Rubic\'s Cube : 5',
'Raspberry P : 4999',
'Rolex : 100000',
'Rollon : 10',
'Rali Car : 2000000',
'Pesho : 0.000001',
'Barrel : 10'])