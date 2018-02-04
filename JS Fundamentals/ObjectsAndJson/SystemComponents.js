function systemComponents(arr) {
    let components = new Map()

    for (let i = 0; i < arr.length; i++) {
        let [systemName, componentName, subComponentName] = arr[i].split(' | ')

        if (!components.has(systemName)) {
            components.set(systemName, new Map())
            components.get(systemName).set(componentName, [])
        }
        if (!components.get(systemName).has(componentName)) {
            components.get(systemName).set(componentName, [])
        }
        components.get(systemName).get(componentName).push(subComponentName)
    }

    let ordered = Array.from(components.keys()).sort((a, b) => {
        let first = components.get(a)
        let second = components.get(b)

        let firstComponentCount = Array.from(first.keys()).length
        let secondComponentCount = Array.from(second.keys()).length
        if (firstComponentCount !== secondComponentCount) {
            return firstComponentCount < secondComponentCount
        }
        return a.toLowerCase() > b.toLowerCase()
    })

    for (let system of ordered) {
        console.info(system)
        let currentSystem = components.get(system)
        let compOrdered = Array.from(currentSystem.keys()).sort((a, b) => {
            let first = currentSystem.get(a)
            let second = currentSystem.get(b)

            let val1ComponentCount = Array.from(first.keys()).length
            let val2ComponentCount = Array.from(second.keys()).length

            return val1ComponentCount < val2ComponentCount
        })
        for (let comp of compOrdered){
            console.log(`|||${comp}`)
            for (let sub of currentSystem.get(comp)){
                console.log(`||||||${sub}`)
            }
        }

    }
}

systemComponents(['SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Lambda | CoreC | C2',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security'])