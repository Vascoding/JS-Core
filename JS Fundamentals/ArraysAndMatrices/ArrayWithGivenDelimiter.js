function arrWithGivenDelimiter(arr) {
    let delimiter = arr.pop()
    console.log(arr.join(delimiter))
}

arrWithGivenDelimiter(['po', 'dsd', '='])