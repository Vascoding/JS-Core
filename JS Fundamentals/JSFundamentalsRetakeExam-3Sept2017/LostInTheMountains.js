function lostInTheMountains(keyWord, text) {
    let messageRegex = new RegExp(`${keyWord}.+(?=${keyWord})`, 'gi')
    let northRegex = new RegExp(/north[a-zA-Z\s]*(\d{2})[^,]*,[^0-9]*([0-9]{6})/gim)
    let eastRegex = new RegExp(/east[a-zA-Z\s]*(\d{2})[^,]*,[^0-9]*([0-9]{6})/gim)

    let matchMessage = text.match(messageRegex)

    let matchesNorth = text.match(northRegex)
    let matchNorth = northRegex.exec(matchesNorth[matchesNorth.length - 1])

    let matchesEast = text.match(eastRegex)
    let matchEast = ''
    let northArr = matchesNorth

    for (let i = matchesEast.length -1; i >= 0; i--) {
        matchEast = matchesEast[i]
        for (let j = 0; j < northArr.length; j++) {
            if (northArr[j].match(/east/)) {
                matchEast = ''
                northArr[j] = 'north'
            }
        }
    }
    
    let message = matchMessage[0].substring(keyWord.length)

    let east = matchEast.match(eastRegex)
    let eastM = eastRegex.exec(east[east.length - 1])

    console.log(`${matchNorth[1]}.${matchNorth[2]} N`)
    console.log(`${eastM[1]}.${eastM[2]} E`)
    console.info(`Message: ${message}`)
}
lostInTheMountains('4ds', 'eaSt 19,432567noRt north east 53,123456north 43,3213454dsNot all those who wander are lost.4dsnorth 47,874532\n')