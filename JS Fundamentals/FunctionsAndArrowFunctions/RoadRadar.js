function roadRadar(args) {

    let speed = args[0],
        zone = args[1]

    function getLimit(zone) {
        switch (zone){
            case 'motorway': return 130
            case 'interstate': return 90
            case 'city': return 50
            case 'residential': return 20
        }
    }

    function isOverLimit(limit, speed) {
        let overspeed = speed - limit
        if (overspeed <= 0){
            return ''
        } else {
            if (overspeed <= 20){
                return 'speeding'
            }
            if (overspeed > 20 && overspeed <= 40){
                return 'excessive speeding'
            }
            if (overspeed > 40){
                return 'reckless driving'
            }
        }
    }

    let limit = getLimit(zone)
    console.log(isOverLimit(limit, speed))
}

roadRadar([40, 'city'])