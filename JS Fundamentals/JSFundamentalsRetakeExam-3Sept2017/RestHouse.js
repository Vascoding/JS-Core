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

    let placedPeople = new Set()

    for (let pair of peopleArr) {
        let first = pair['first']
        let second = pair['second']
        let firstGender = first['gender']
        let secondGender = second['gender']
        if (firstGender === secondGender) {
            let genderType = firstGender
            for (let [room, type] of rooms) {
                for (let [roomType, people] of type) {
                    if (roomType === tripleBedded && people.length === 0) {
                        if (!placedPeople.has(first)) {
                            people.push(first)
                            placedPeople.add(first)
                            roomBeds++
                        }
                        if (!placedPeople.has(second)) {
                            people.push(second)
                            placedPeople.add(second)
                            roomBeds++
                        }
                    }
                    else if (roomType === tripleBedded && people.length === 1 && genderType === people[0].gender) {
                        if (!placedPeople.has(first)) {
                            people.push(first)
                            placedPeople.add(first)
                            roomBeds++
                        }
                        if (!placedPeople.has(second)) {
                            people.push(second)
                            placedPeople.add(second)
                            roomBeds++
                        }
                    }
                    else if (roomType === tripleBedded && people.length === 2 && genderType === people[0].gender) {
                        if (!placedPeople.has(first)) {
                            people.push(first)
                            roomBeds++
                            placedPeople.add(first)
                        } else {
                            people.push(second)
                            roomBeds++
                            placedPeople.add(second)

                        }
                    }
                }
            }
        } else {
            for (let [room, type] of rooms) {
                for (let [roomType, people] of type) {
                    if (roomType === doubleBedded && people.length === 0 && !placedPeople.has(first) && !placedPeople.has(second)) {
                        people.push(first)
                        people.push(second)
                        placedPeople.add(first)
                        placedPeople.add(second)
                        roomBeds += 2
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

restHouse([{"number": "600", "type": "triple"},
        {"number": "217", "type": "triple"},
        {"number": "408A", "type": "double-bedded"},
        {"number": "442", "type": "double-bedded"},
        {"number": "482", "type": "double-bedded"},
        {"number": "303", "type": "triple"},
        {"number": "906", "type": "double-bedded"},
        {"number": "705", "type": "triple"},
        {"number": "405A", "type": "double-bedded"},
        {"number": "495", "type": "double-bedded"}],
    [{
        "first": {"name": "Javier Ortega", "gender": "male", "age": 59},
        "second": {"name": "Kevin Huff", "gender": "male", "age": 67}
    },
        {
            "first": {"name": "Horace Thornton", "gender": "male", "age": 39},
            "second": {"name": "Alejandro Lane", "gender": "male", "age": 10}
        },
        {
            "first": {"name": "Chelsea Wilkins", "gender": "female", "age": 65},
            "second": {"name": "Audrey Underwood", "gender": "female", "age": 23}
        },
        {
            "first": {"name": "Ora Wilkerson", "gender": "female", "age": 57},
            "second": {"name": "Melody Gill", "gender": "female", "age": 53}
        },
        {
            "first": {"name": "Andre Kim", "gender": "male", "age": 4},
            "second": {"name": "Sammy Thompson", "gender": "male", "age": 47}
        },
        {
            "first": {"name": "Sadie Carson", "gender": "female", "age": 66},
            "second": {"name": "Wendell Powell", "gender": "male", "age": 43}
        },
        {
            "first": {"name": "Monica Dunn", "gender": "female", "age": 48},
            "second": {"name": "Audrey Underwood", "gender": "female", "age": 19}
        },
        {
            "first": {"name": "Valerie French", "gender": "female", "age": 68},
            "second": {"name": "Merle Jenkins", "gender": "male", "age": 62}
        },
        {
            "first": {"name": "Kelly Manning", "gender": "female", "age": 6},
            "second": {"name": "Laurie Montgomery", "gender": "female", "age": 23}
        },
        {
            "first": {"name": "Violet Kelly", "gender": "female", "age": 10},
            "second": {"name": "Billy Maxwell", "gender": "male", "age": 48}
        }])