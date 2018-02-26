function cars(arr) {
    let commands = (function () {
        let cars = []
        function create(args) {
            if (args.length === 3) {
                let parent = cars.find(c => c.name === args[2])
                let newCar = Object.create(parent)
                newCar.name = args[0]
                cars.push(newCar)
            } else {
                let newCar = {
                    name: args[0]
                }
                cars.push(newCar)
            }
        }

        function set(args) {
            let car = cars.find(c => c.name === args[0])
            car[args[1]] = args[2]
        }

        function print(args) {
            let properties = []
            let car = cars.find(c => c.name === args[0])
            for (let prop in car) {
                if (prop !== 'name') {
                    properties.push(prop + ':' + car[prop])
                }
            }
            console.log(properties.join(', '));
        }
        return {
            create, set, print
        }
    })()

    for (let el of arr) {
        let splited = el.split(' ')
        let command = splited.shift()
        commands[command](splited)
    }
}

cars(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2'])