function arguments() {
    let allTypes = new Map()
    for (let i = 0; i < arguments.length; i++) {
        let obj = arguments[i]
        let type = typeof obj

        if (!allTypes.has(type)) {
            allTypes.set(type, 1)
        } else {
            allTypes.set(type, allTypes.get(type) + 1)
        }
        console.log(type + ': ' + obj)
    }
    let sorted = Array.from(allTypes.keys()).sort((a, b) => {
        if (allTypes.get(a) !== allTypes.get(b)) {
            return allTypes.get(b) - allTypes.get(a)
        }
    })

    for (let obj of sorted) {
        console.log(`${obj} = ${allTypes.get(obj)}`)
    }
}

arguments('cat', 42, function () { console.log('Hello world!') })