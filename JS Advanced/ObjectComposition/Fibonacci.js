function fibonacci() {
    let first = 0,
        second = 1
    function next() {
        let n = first + second
        first = second
        second = n
        return first
    }
    return next
}

let fib = fibonacci()
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());