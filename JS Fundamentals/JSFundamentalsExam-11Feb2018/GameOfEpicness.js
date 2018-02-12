function game(arr, matrix) {
    let kingdom = new Map()
    let battleStatistics = new Map()

    for (let i = 0; i < arr.length; i++) {
        let kingdomName = arr[i]['kingdom']
        let general = arr[i]['general']
        let army = Number(arr[i]['army'])
        if (kingdomName !== undefined && general !== undefined && army !== undefined) {
            if (!kingdom.has(kingdomName)) {
                kingdom.set(kingdomName, new Map())
                kingdom.get(kingdomName).set(general, army)
                battleStatistics.set(kingdomName, new Map())
                battleStatistics.get(kingdomName).set(general, {'Wins': 0, 'Loses': 0})
            }
            else if (!kingdom.get(kingdomName).has(general)) {
                kingdom.get(kingdomName).set(general, army)
                battleStatistics.get(kingdomName).set(general, {'Wins': 0, 'Loses': 0})
            } else {
                kingdom.get(kingdomName).set(general, army + kingdom.get(kingdomName).get(general))
                battleStatistics.get(kingdomName).set(general, {'Wins': 0, 'Loses': 0})
            }
        }

    }


    for (let i = 0; i < matrix.length; i++) {
        let attackingKingdom = matrix[i][0]
        let attackingGeneral = matrix[i][1]
        let defendingKingdom = matrix[i][2]
        let defendingGeneral = matrix[i][3]
        let attackingArmy = kingdom.get(attackingKingdom).get(attackingGeneral)
        let defendingArmy = kingdom.get(defendingKingdom).get(defendingGeneral)
        if (kingdom.get(attackingKingdom).has(attackingGeneral) && kingdom.get(attackingKingdom).has(defendingGeneral)) {
            continue
        }
        if (kingdom.get(defendingKingdom).has(attackingGeneral) && kingdom.get(defendingKingdom).has(defendingGeneral)) {
            continue
        }
        if (attackingKingdom !== defendingKingdom && attackingArmy !== defendingArmy) {
            if (attackingArmy > defendingArmy) {
                kingdom.get(attackingKingdom).set(attackingGeneral, Math.floor(attackingArmy + (attackingArmy * 0.10)))
                kingdom.get(defendingKingdom).set(defendingGeneral, Math.floor(defendingArmy - (defendingArmy * 0.10)))
                battleStatistics.get(attackingKingdom).get(attackingGeneral)['Wins']++
                battleStatistics.get(defendingKingdom).get(defendingGeneral)['Loses']++

            } else {
                kingdom.get(defendingKingdom).set(defendingGeneral, Math.floor(defendingArmy + (defendingArmy * 0.10)))
                kingdom.get(attackingKingdom).set(attackingGeneral, Math.floor(attackingArmy - (attackingArmy * 0.10)))
                battleStatistics.get(defendingKingdom).get(defendingGeneral)['Wins']++
                battleStatistics.get(attackingKingdom).get(attackingGeneral)['Loses']++
            }
        }

    }

    let sorted = Array.from(battleStatistics.keys()).sort((a,b) => {
        let firstWin = 0
        let secondWin = 0
        let firstKingdom = battleStatistics.get(a)
        let secondKingdom = battleStatistics.get(b)
        for (let [general, stats] of firstKingdom) {
            firstWin += stats['Wins']
        }
        for (let [general, stats] of secondKingdom) {
            secondWin += stats['Wins']
        }

        if (firstWin !== secondWin) {
            return secondWin - firstWin
        }

        let firstLose = 0
        let secondLose = 0
        for (let [general, stats] of firstKingdom) {
            firstLose += stats['Loses']
        }
        for (let [general, stats] of secondKingdom) {
            secondLose += stats['Loses']
        }

        if (firstLose !== secondLose) {
            return firstLose - secondLose
        }

        return a.localeCompare(b)
    })



    console.log(`Winner: ${sorted[0]}`)
    let sortedGenerals = Array.from(kingdom.get(sorted[0]).keys()).sort((a,b) => {
        return kingdom.get(sorted[0]).get(b) - kingdom.get(sorted[0]).get(a)
    })
    for (let general of sortedGenerals) {
        console.log(`/\\general: ${general}`)
        console.log(`---army: ${kingdom.get(sorted[0]).get(general)}`)
        console.log(`---wins: ${battleStatistics.get(sorted[0]).get(general)['Wins']}`)
        console.log(`---losses: ${battleStatistics.get(sorted[0]).get(general)['Loses']}`)
    }
}

game([ { kingdom: "Maiden Way", general: "Merek", army: 5000 },
        { kingdom: "Stonegate", general: "Ulric", army: 4900 },
        { kingdom: "Stonegate", general: "Doran", army: 70000 },
        { kingdom: "YorkenShire", general: "Quinn", army: 0 },
        { kingdom: "YorkenShire", general: "Quinn", army: 2000 },
        { kingdom: "Maiden Way", general: "Berinon", army: 100000 } ],
    [ ["YorkenShire", "Quinn", "Stonegate", "Ulric"],
        ["Stonegate", "Ulric", "Stonegate", "Doran"],
        ["Stonegate", "Doran", "Maiden Way", "Merek"],
        ["Stonegate", "Ulric", "Maiden Way", "Merek"],
        ["Maiden Way", "Berinon", "Stonegate", "Ulric"] ])