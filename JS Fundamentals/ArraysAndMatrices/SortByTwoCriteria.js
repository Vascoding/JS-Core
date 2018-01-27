function sortArray(args) {
    args.sort(function (a, b) {
        a = a.toLowerCase()
        b = b.toLowerCase()

        if (a.length > b.length) {
            return 1
        }

        if (a.length < b.length) {
            return -1
        } else {
            if (a > b) {
                return 1
            }
            if (a < b) {
                return -1
            }
            return 0
        }

    })

    console.log(args.join('\n'))
}

sortArray(['test', 'Deny', 'Omen', 'Default', 'George'])