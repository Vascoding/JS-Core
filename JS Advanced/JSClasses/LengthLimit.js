class Stringer {
    constructor(str, len) {
        this.innerString = str
        this.innerLength = len
    }

    increase(len) {
        this.innerLength += len
    }

    decrease(len) {
        this.innerLength - len < 0 ? this.innerLength = 0 : this.innerLength -= len
    }

    toString() {
        return this.innerString.length > this.innerLength ? `${this.innerString.substring(0, this.innerLength)}...` : `${this.innerString}`
    }
}

let test = new Stringer("Test", 5);
console.log(test.toString()); //Test

test.decrease(3);
console.log(test.toString()); //Te...

test.decrease(5);
console.log(test.toString()); //...

test.increase(4);
console.log(test.toString()); //Test

console.log('2\u00B3')