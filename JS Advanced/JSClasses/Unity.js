class Rat {
    constructor (name) {
        this.name = name
        this.unitedRats = []
    }

    unite(rat) {
        if (rat instanceof Rat) {
            this.unitedRats.push(rat)
        }
    }

    getRats(){
        return this.unitedRats
    }

    toString() {
        if (this.unitedRats.length === 0) {
            return `${this.name}`
        }

        let str = `${this.name}\n`
        for (let rat of this.unitedRats) {
            str += `##${rat.name}\n`
        }
        return str
    }
}

let test = new Rat("Pesho");
console.log(test.toString()); //Pesho

console.log(test.getRats()); //[]

test.unite(new Rat("Gosho"));
test.unite('fake');
console.log(test.getRats());
//[ Rat { name: 'Gosho', unitedRats: [] },
//  Rat { name: 'Sasho', unitedRats: [] } ]

console.log(test.toString());
// Pesho
// ##Gosho
// ##Sasho
