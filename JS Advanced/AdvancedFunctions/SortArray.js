function sortArray(arr, sortMehtod) {
    let ascendingCompare = function (a, b) {
        return a - b
    }

    let descendingCompare = function (a, b) {
        return b - a
    }

    let sortStrategies = {
        'asc': ascendingCompare,
        'desc': descendingCompare
    }

    return arr.sort(sortStrategies[sortMehtod])
}

console.log(sortArray([14, 7, 17, 6, 8], 'desc'))