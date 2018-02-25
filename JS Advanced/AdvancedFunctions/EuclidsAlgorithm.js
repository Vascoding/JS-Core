function euclidsAlgorithm(first, second) {
    if (second === 0) {
        return first;
    }
    else {
        let remainder = first % second;
        return euclidsAlgorithm(second, remainder);
    }
}

console.log(euclidsAlgorithm(252, 105));