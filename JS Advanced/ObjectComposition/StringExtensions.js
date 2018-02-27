(function stringExtension() {
    String.prototype.ensureStart = function (str) {
        let newString = this.toString()
        if (!this.startsWith(str)) {
            newString = str + this
        }
        return newString
    }

    String.prototype.ensureEnd = function (str) {
        let newString = this.toString()
        if (!this.endsWith(str)) {
            newString = this + str
        }
        return newString
    }

    String.prototype.isEmpty = function () {
        return this.toString() === ''
    }

    String.prototype.truncate = function (n) {
        let oldString = this.toString()
        if (n < 4) {
            return '.'.repeat(n)
        }

        if (oldString.length > n) {
            let strToLastSpace = oldString.substring(0, oldString.lastIndexOf(' '))
            while (strToLastSpace.length > n) {
                strToLastSpace = strToLastSpace.substring(0, strToLastSpace.lastIndexOf(' ')) + '...'
            }

            if (strToLastSpace === '') {
                oldString = oldString.substring(0, n - 3) + '...'
            }
            return strToLastSpace
        }
        return oldString
    }

    String.format = function () {
        let regex = /{[0-9]}/g
        let strFormat = arguments[0]
        let words = []

        for (let i = 1; i < arguments.length; i++) {
            words.push(arguments[i])
        }
        let matches
        while (matches = regex.exec(strFormat)){
            let index = Number(matches.toString()[1])
            let replace = words[index]
            if (replace !== undefined) {
                strFormat = strFormat.replace(matches, replace)
            }

        }
        return strFormat
    }
})()



let str = String.format('The {0} {1} fox',
    'quick', 'brown');

console.log(str)