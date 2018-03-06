function extendClass(classToExtend) {
    classToExtend.prototype.species = 'Human'
    classToExtend.prototype.toSpeciesString = function () {
        return `I am a ${this.species}. ${this.toString()}`
    }
}

class Person {
    constructor() {
        this.name = 'Pesho'
    }
}

let person = new Person()

console.log(extendClass(Person))