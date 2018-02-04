function register(arr) {
    let cars = new Map()

    for (let i = 0; i < arr.length; i++) {
        let [carBrand, carModel, produced] = arr[i].split(' | ')
        produced = Number(produced)
        if (!cars.has(carBrand)) {
            cars.set(carBrand, new Map())
            cars.get(carBrand).set(carModel, produced)
        } else if (!cars.get(carBrand).has(carModel)) {
            cars.get(carBrand).set(carModel, produced)
        } else {
            let current = cars.get(carBrand).get(carModel)
            cars.get(carBrand).set(carModel, current + produced)
        }
    }

    for (let [car, models] of cars){
        console.log(car)
        for (let [model, produced] of models){
            console.log(`###${model} -> ${produced}`)
        }
    }
}

register(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'Audi | Q6 | 200',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10'])