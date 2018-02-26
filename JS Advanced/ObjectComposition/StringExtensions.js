(function stringExtension() {
    let myString = ''

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
        let newStr = oldString.substring(0, oldString.length - n)
        if (n < 4) {
            return '.'.repeat(n)
        }
        if (newStr.length > n) {
            let strToLastSpace = newStr.substring(0, newStr.lastIndexOf(' '))
            while (strToLastSpace.length <= n) {
                strToLastSpace = strToLastSpace.substring(0, strToLastSpace.lastIndexOf(' '))
            }

            if (strToLastSpace !== '') {
                newStr = strToLastSpace + '...'
            } else {
                newStr = newStr.substring(0, n - 3) + '...'
            }
        }
        return newStr
    }
})()

let testString = 'the quick brown fox jumps over the lazy dog';
testString = testString.truncate(6)
testString = testString.truncate(12)

console.log(testString)