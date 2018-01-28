function findOccurrences(str, word) {
    let b = '\\b'
    let regex = new RegExp(`${b}${word}${b}`, 'ig')

    let mach = str.match(regex)
    if (mach) {
        console.log(mach.length)
    } else {
        console.log(0)
    }
}

findOccurrences('The waterfall was so high, that the child couldn’t see its peak.', 'e')

