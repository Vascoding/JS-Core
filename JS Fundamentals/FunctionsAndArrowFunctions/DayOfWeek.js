function dayOfWeek(str) {
    let arr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    let index = arr.indexOf(str)
    return index !== -1 ? index + 1 : 'error'
}

console.log(dayOfWeek('Tuesday'))