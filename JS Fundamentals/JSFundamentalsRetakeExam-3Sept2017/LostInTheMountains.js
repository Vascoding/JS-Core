function lostInTheMountains(keyWord, text) {
    let messageRegex = new RegExp(`${keyWord}.+(?=${keyWord})`, 'gi')
    let northRegex = new RegExp(/north[^0-9]*(\d{2})[^,]*,[^0-9]*(\d{6})/gmi)
    let eastRegex = new RegExp(/east[^0-9]*(\d{2})[^,]*,[^0-9]*(\d{6})/gmi)

    let matchMessage = text.match(messageRegex)


    let matchesNorth = text.match(northRegex)
    let matchNorth = northRegex.exec(matchesNorth[matchesNorth.length - 1])


    let matchesEast = text.match(eastRegex)
    let matchEast = eastRegex.exec(matchesEast[matchesEast.length - 1])
    let message = matchMessage[0].substring(keyWord.length)


    console.log(`${matchNorth[1]}.${matchNorth[2]} N`)
    console.log(`${matchEast[1]}.${matchEast[2]} E`)
    console.info(`Message: ${message}`)
}

lostInTheMountains('keyword', 'keyword  let them eat cake!keywordNORTHEASTNORTH again42,north234567,dsae345East\t23,\n 432568')