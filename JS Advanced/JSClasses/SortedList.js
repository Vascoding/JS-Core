let List = (() => {
    return class {
        constructor() {
            this.list = []
            this.size = this.list.length
        }


        add(element) {
            this.list.push(element)
            this.list.sort((a, b) => a - b)
            this.size = this.list.length
        }

        remove(index) {
            if (index >= 0) {
                this.list.splice(index, 1)
                this.list.sort((a, b) => a - b)
                this.size = this.list.length
            }
        }

        get(index) {
            return this.list[index]
        }
    }
})()

let list = new List()
list.add(5)
list.add(123)
console.log(list)