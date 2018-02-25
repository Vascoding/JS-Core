function process(args) {
    let collection = []
    let commands = {
        add: function (arg) {
            collection.push(arg)
        },
        remove: function (arg) {
            collection = collection.filter(i => i !== arg)
        },
        print: function () {
            console.log(collection.join(','))
        }
    }

    for (let obj of args) {
        let args = obj.split(' ')
        let commandName = args.shift()
        commands[commandName](args[0])
    }
}

process(['add hello', 'add again', 'remove hello', 'add again', 'print'])
