function aggregateTable(arr) {
    let cities = []
    let income = 0
    for (let i = 0; i < arr.length; i++) {
        let splited = arr[i].split('|').filter(s => s !== '')
        cities.push(splited[0].trim())
        income += Number(splited[1].trim())
    }

    console.log(cities.join(', '))
    console.log(income)
}

aggregateTable(['| Sofia           | 300',
                '| Veliko Tarnovo  | 500',
                '| Yambol          | 275']
)