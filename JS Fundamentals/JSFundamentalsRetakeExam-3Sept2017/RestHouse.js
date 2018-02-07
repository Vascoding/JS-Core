function restHouse(roomsArr, peopleArr) {
    const doubleBedded = 'double-bedded'
    const tripleBedded = 'triple'

    let rooms = new Map()

    let roomBeds = 0
    for (let i = 0; i < roomsArr.length; i++) {
        if (!rooms.has(roomsArr[i]['number'])) {
            rooms.set(roomsArr[i]['number'], new Map())
            rooms.get(roomsArr[i]['number']).set(roomsArr[i]['type'], [])
        }
    }

    for (let pair of peopleArr) {
        let first = pair['first']
        let second = pair['second']
        let firstGender = first['gender']
        let secondGender = second['gender']
        if (firstGender === secondGender) {
            let genderType = firstGender
            for (let [room, type] of rooms) {
                for (let [roomType, people] of type) {
                    if (roomType === tripleBedded && people.length === 0 && first !== undefined && second !== undefined) {
                        people.push(first)
                        people.push(second)
                        roomBeds += 2
                        first = undefined
                        second = undefined
                    }
                    else if (roomType === tripleBedded && people.length === 1 && genderType === people[0].gender && first !== undefined && second !== undefined) {
                        people.push(first)
                        people.push(second)
                        roomBeds += 2
                        first = undefined
                        second = undefined
                    }
                    else if (roomType === tripleBedded && people.length === 2 && genderType === people[0].gender) {
                        if (first !== undefined) {
                            people.push(first)
                            first = undefined
                        } else {
                            people.push(second)
                            second = undefined
                        }
                        roomBeds++

                    } else {
                        if (first !== undefined) {

                        }
                        if (second !== undefined) {

                        }
                    }
                }
            }
        } else {
            for (let [room, type] of rooms) {
                for (let [roomType, people] of type) {
                    if (roomType === doubleBedded && first !== undefined && second !== undefined) {
                        people.push(first)
                        people.push(second)
                        roomBeds += 2
                        first = undefined
                        second = undefined
                    }
                }
            }
        }
    }

    let roomsKeySort = Array.from(rooms.keys()).sort()


    for (let roomKey of roomsKeySort) {
        console.log(`Room number: ${roomKey}`)
        let room = rooms.get(roomKey)
        for (let [type, people] of room) {
            let sortPeople = people.sort((a, b) => {
                return a.name.localeCompare(b.name)
            })

            for (let person of sortPeople) {
                console.log(`--Guest Name: ${person['name']}`)
                console.log(`--Guest Age: ${person['age']}`)
            }
            let emptyBeds = type === doubleBedded ? 2 - people.length : 3 - people.length
            console.log(`Empty beds in the room: ${emptyBeds}`)
        }
    }

    console.log(`Guests moved to the tea house: ${peopleArr.length * 2 - roomBeds}`)
}

restHouse([{"number": "428", "type": "triple"},
        {"number": "161", "type": "triple"},
        {"number": "242", "type": "double-bedded"},
        {"number": "537", "type": "triple"}],
    [{
        "first": {"name": "Nina Diaz", "gender": "female", "age": 29},
        "second": {"name": "Carol Hansen", "gender": "female", "age": 6}
    },
        {
            "first": {"name": "Georgia Thomas", "gender": "female", "age": 38},
            "second": {"name": "Freddie Harmon", "gender": "male", "age": 46}
        },
        {
            "first": {"name": "Freddie Harmon", "gender": "male", "age": 30},
            "second": {"name": "Jesus Terry", "gender": "male", "age": 64}
        },
        {
            "first": {"name": "Tracy Reid", "gender": "male", "age": 41},
            "second": {"name": "Jordan Garner", "gender": "male", "age": 16}
        },
        {
            "first": {"name": "Kara Burns", "gender": "female", "age": 7},
            "second": {"name": "Marjorie Butler", "gender": "female", "age": 28}
        }])