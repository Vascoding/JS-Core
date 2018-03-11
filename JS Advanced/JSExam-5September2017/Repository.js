class Repository {
    constructor(props){
        this.props = props
        this.data = new Map()
        this.id = 0
    }

    add(entity){
        for (let key of Object.keys(entity)) {
            if (this.props[key] === undefined) {
                throw new Error(`Property ${key} is missing from the entity!`)
            }
        }
        for (let key of Object.keys(entity)) {
            if (typeof entity[key] !== this.props[key]) {
                throw new TypeError(`Property ${entity[key]} is of incorrect type!`)
            }
        }

        this.data.set(this.id++, entity)
        return this.id - 1
    }

    get(id){
        if (this.data.get(id) === undefined) {
            throw new Error(`Entity with id: ${id} does not exist!`)
        }
        return this.data.get(id)
    }

    update(id, entity){
        if (this.data.get(id) === undefined) {
            throw new Error(`Entity with id: ${id} does not exist!`)
        }
        for (let key of Object.keys(entity)) {
            if (this.props[key] === undefined) {
                throw new Error(`Property ${key} is missing from the entity!`)
            }
        }
        for (let key of Object.keys(entity)) {
            if (typeof entity[key] !== this.props[key]) {
                throw new TypeError(`Property ${entity[key]} is of incorrect type!`)
            }
        }

        this.del(id)
        this.data.set(id, entity)
    }

    del(id){
        if (this.data.get(id) === undefined) {
            throw new Error(`Entity with id: ${id} does not exist!`)
        }
        this.data.delete(id)
    }

    get count(){
        return this.data.size
    }
}
let props = {
    name: "string",
    age: "number"
};
let repo = new Repository(props)
let e1 = {
    name: "Pesho",
    age: 21
};

repo.add(e1);

console.log(repo.count)

console.log(repo.add(e1));

repo.update(1, {name: "Gosho", age: 20});
console.log(repo.get(1).name)