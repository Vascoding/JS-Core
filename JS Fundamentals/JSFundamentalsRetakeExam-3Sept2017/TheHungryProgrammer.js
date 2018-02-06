function hungryProgrammer(portions, commands) {
    let mealsEaten = 0
    for (let command of commands) {
        let splited = command.split(/\s+/g).filter(f => f !== "")
        if (splited.length === 1) {
            if (splited[0] === 'Serve') {
                if (portions.length > 0) {
                    console.log(`${portions.splice(portions.length - 1)} served!`)
                }
            }

            if (splited[0] === 'Eat') {
                if (portions.length > 0) {
                    console.log(`${portions.shift()} eaten`)
                    mealsEaten++
                }
            }

            if (splited[0] === 'End') {
                break
            }
        }
        if (splited.length === 2) {
            if (splited[0] === 'Add') {
                portions.unshift(splited[1])
            }
        }

        if (splited.length === 3) {
            if (splited[0] === 'Shift') {
                let first = portions[Number(splited[1])]
                let second = portions[Number(splited[2])]
                if (first !== undefined && second !== undefined) {
                    portions[splited[1]] = second
                    portions[splited[2]] = first
                }
            }

            if (splited[0] === 'Consume') {
                let start = Number(splited[1])
                let end = Number(splited[2])
                let delCount = end - start + 1
                let containsFirst = portions[start],
                    containsSecond = portions[end]
                if (containsFirst !== undefined && containsSecond !== undefined) {
                    portions.splice(start, delCount)
                    mealsEaten += end - start + 1
                    console.log('Burp!')
                }
            }
        }
    }
    console.log(portions.length === 0 ? 'The food is gone' : `Meals left: ${portions.join(', ')}`)
    console.log(`Meals eaten: ${mealsEaten}`)
}

hungryProgrammer(['fries', 'fish', 'beer', 'chicken', 'beer', 'eggs'],
    ['Add spaghetti',
        'Shift 0 1',
        'Consume 1 4',
        'End'
    ])