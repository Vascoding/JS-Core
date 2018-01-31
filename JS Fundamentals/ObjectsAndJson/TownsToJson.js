function townsToJson(arr) {
    let obj = []

    for (let i = 1; i < arr.length; i++) {
        let splited = arr[i].trim().split('|').filter(s => s !== '')
        let town = splited[0].trim(),
            latitude = splited[1].trim(),
            longitude = splited[2].trim()

        let data = {"Town": town, "Latitude": Number(latitude), "Longitude": Number(longitude)}
        obj.push(data)
    }

    console.log(JSON.stringify(obj))
}

townsToJson(['| Town | Latitude | Longitude |',
    '| Veliko Turnovo | 43.0757 | 25.6172 |',
    '| Monatevideo | 34.50 | 56.11 |']
)