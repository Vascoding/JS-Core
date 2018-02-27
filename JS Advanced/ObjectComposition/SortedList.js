function sortedList() {
    let list = []
    list.size = list.length

    list.add = function (element) {
        list.push(element)
        list.sort((a, b) => a - b)
        list.size = list.length
    }

    list.remove = function (index) {
        if (index >= 0) {
            list.splice(index, 1)
            list.sort((a, b) => a - b)
            list.size = list.length
        }
    }

    list.get = function (index) {
        return list[index]
    }

    return list
}

let myList = sortedList()
myList.add(5)
myList.add(5)
myList.add(3)
myList.add(5)
myList.add(5)
myList.add(3)
myList.add(3)
myList.add(5)
myList.add(5)
myList.add(3)
myList.remove(-1)
console.log(myList.size)
