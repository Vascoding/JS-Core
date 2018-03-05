let Extensible = (() => {
    let id = -1
    return class {
        constructor() {
            this.id = ++id
        }

        extend(template) {
            for (let el in template) {
                if (template[el] && {}.toString.call(template[el]) === '[object Function]') {
                    Object.getPrototypeOf(this)[el] = template[el]
                } else {
                    this[el] = template[el]
                }
            }
        }
    }
})()

let template = {
    extensionData: 5,
    extensionMethod: function (value) {
        return value + 1;
    }
}
let obj1 = new Extensible()
obj1.extend(template)
console.log(obj1)
