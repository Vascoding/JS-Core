function initializeClasses() {
    class Melon{
        constructor(weight, melonSort){
            if (new.target === Melon) {
                throw new Error('Abstract class cannot be instantiated directly')
            }

            this.weight = weight
            this.melonSort = melonSort
        }

        toString(){
            return `Element: ${this.constructor.name.substring(0, this.constructor.name.length - 5)}\nSort: ${this.melonSort}`
        }
    }

    class Watermelon extends Melon{
        constructor(weight, melonSort){
            super(weight, melonSort)
            this._elementIndex = this.weight * this.melonSort.length
        }

        get elementIndex(){
            return this._elementIndex
        }

        toString(){
            return super.toString() + `\nElement Index: ${this.elementIndex}`
        }
    }
    class Firemelon extends Melon{
        constructor(weight, melonSort){
            super(weight, melonSort)
            this._elementIndex = this.weight * this.melonSort.length
        }

        get elementIndex(){
            return this._elementIndex
        }

        toString(){
            return super.toString() + `\nElement Index: ${this.elementIndex}`
        }
    }
    class Earthmelon extends Melon{
        constructor(weight, melonSort){
            super(weight, melonSort)
            this._elementIndex = this.weight * this.melonSort.length
        }

        get elementIndex(){
            return this._elementIndex
        }

        toString(){
            return super.toString() + `\nElement Index: ${this.elementIndex}`
        }
    }
    class Airmelon extends Melon{
        constructor(weight, melonSort){
            super(weight, melonSort)
            this._elementIndex = this.weight * this.melonSort.length
        }

        get elementIndex(){
            return this._elementIndex
        }

        toString(){
            return super.toString() + `\nElement index: ${this.elementIndex}`
        }
    }

    class Melolemonmelon extends Watermelon{
        constructor(weight, melonSort){
            super(weight, melonSort)
            this.elements = ['Water', 'Fire', 'Earth', 'Air']
        }

        morph(){
            let currentElement = this.elements.shift()
            this.elements.push(currentElement)
        }

        toString(){

            return `Element: ${this.elements[0]}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
        }
    }

    return {Melon, Watermelon, Airmelon, Earthmelon, Melolemonmelon, Firemelon}
}

let Melo = initializeClasses().Melolemonmelon
let melo = new Melo(150, 'Melo')
melo.morph()
melo.morph()
console.log(melo.toString())