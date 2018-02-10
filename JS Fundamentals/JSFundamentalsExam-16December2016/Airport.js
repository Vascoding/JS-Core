function airport(arr) {
    let airport = new Map()
    let planes = new Set()

    for (let i = 0; i < arr.length; i++) {
        let [planeId, town, passangersCount, action] = arr[i].split(/\s+/g).filter(w => w !== "")
        passangersCount = Number(passangersCount)

        if (planeId === undefined || town === undefined || passangersCount === undefined || action === undefined || (action !== 'land' && action !== 'depart')
        || arr[i].split(' ').filter(s => s !== '').length !== 4) {
            break
        } else {
            if (!planes.has(planeId)) {
                if (action === 'land') {
                    if (!airport.has(town)) {
                        airport.set(town, {'Arrivals': passangersCount, 'Departures': 0, 'Planes': new Set()})
                        airport.get(town)['Planes'].add(planeId)
                    } else {
                        airport.get(town)['Arrivals'] += passangersCount
                        airport.get(town)['Planes'].add(planeId)
                    }

                    planes.add(planeId)
                }
            } else {
                if (action === 'depart') {
                    if (planes.has(planeId)) {
                        if (!airport.has(town)) {
                            airport.set(town, {'Arrivals': 0, 'Departures': passangersCount, 'Planes': new Set()})
                            airport.get(town)['Planes'].add(planeId)
                            planes.delete(planeId)
                        } else {
                            airport.get(town)['Departures'] += passangersCount
                            airport.get(town)['Planes'].add(planeId)
                            planes.delete(planeId)
                        }
                    }
                }
            }
        }
    }


    console.log('Planes left:')
    let sortedPlanesLeft = Array.from(planes).sort((a,b) => a.localeCompare(b))
    for (let plane of sortedPlanesLeft) {
        console.log(`- ${plane}`)
    }
    let sortedKeys = Array.from(airport.keys()).sort((a, b) => {
        if (airport.get(b)['Arrivals'] !== airport.get(a)['Arrivals']) {
            return airport.get(b)['Arrivals'] - airport.get(a)['Arrivals']
        }
        return a.localeCompare(b)
    })

    for (let town of sortedKeys){
        let data = airport.get(town)
        console.log(town)
        console.log('Arrivals: ' + data['Arrivals'])
        console.log('Departures: ' + data['Departures'])
        let sortedPlanes = Array.from(data['Planes']).sort((a, b) => a.localeCompare(b))
        console.log('Planes:')
        for (let plane of sortedPlanes) {
            console.log(`-- ${plane}`)
        }
    }
}

airport([
    'RTA72 London 140 land',
    'RTA72 Brussels 240 depart',
    'RTA72 Sofia 450 land',
    'RTA72 Lisbon 240 depart',
    'RTA72 Berlin 350 land',
    'RTA72 Otava 201 depart',
    'RTA72 Haga 350 land',
    'RTA72 Otava 201 depart',
    'RTA72 Dortmund 150 land',
    'RTA72 Montana 243 depart',
    'RTA72 Monreal 350 land',
    'RTA72 NewYork 201 depart',
    'RTA72 Pekin 350 land',
    'RTA72 Tokyo 201 depart',
    'RTA72 Warshaw 350 land',
    'RTA72 Riga 201 depart'])