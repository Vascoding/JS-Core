function addAndRemove(commands) {
    let arr = []
    let element = 1

    for (let i = 0; i < commands.length; i++) {
        if (commands[i] === 'add') {
            arr.push(element)
        } else {
            arr.pop()
        }
        element++
    }

    if (arr.length === 0) {
        console.log('Empty')
    } else {
        console.log(arr.join('\n'))
    }
}

addAndRemove(['add', 'add', 'remove', 'add', 'add'])