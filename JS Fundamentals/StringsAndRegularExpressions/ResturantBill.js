function resturantBill(arr) {
    let products = []
    let total = 0

    for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 0) {
            products.push(arr[i])
        } else {
            total += Number(arr[i])
        }
    }

    console.log(`You purchased ${products.join(', ')} for a total sum of ${total}`)
}

resturantBill(['Beer Zagorka', '2.65', 'Tripe soup', '7.80','Lasagna', '5.69'])