function maxElement(arr) {
    return arr.reduce((a, b) => Math.max(a, b))
}

console.log(maxElement([10, 20, 5]));