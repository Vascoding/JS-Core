function assemblyCar(requirements) {
    let engines = [
            {power: 90, volume: 1800},
            {power: 120, volume: 2400},
            {power: 200, volume: 3500}
            ]

    let wheels = [0, 0, 0, 0]
    if (requirements.wheelsize % 2 === 0) {
        requirements.wheelsize--
    }
    for (let i = 0; i < wheels.length; i++) {
        wheels[i] = Math.trunc(requirements.wheelsize)
    }
    let producedCar = {
        model: requirements.model,
        engine: engines.find(e => e.power === requirements.power) || engines.find(e => e.power > requirements.power),
        carriage: {
            type: requirements.carriage,
            color: requirements.color
        },
        wheels: wheels
    }

    return producedCar
}

console.log(assemblyCar({
        model: 'Opel Vectra',
        power: 110,
        color: 'grey',
        carriage: 'coupe',
        wheelsize: 17
    }
));