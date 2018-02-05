function userNames(arr) {
    let set = new Set()

    arr.forEach(n => set.add(n))

    console.log(Array.from(set.keys()).sort((a, b) => {
        if (a.length !== b.length) {
            return a.length - b.length
        }

        return a.localeCompare(b)
    }).join('\n'))
}

userNames(['Denise',
    'Ignatius',
    'Iris',
    'Isacc',
    'Indie',
    'Dean',
    'Donatello',
    'Enfuego',
    'Benjamin',
    'Biser',
    'Bounty',
    'Renard',
    'Rot'])