class Rectangle {
    constructor(width, height, color){
        this.width = width
        this.height = height
        this.color = color
    }

    calcArea() {
        return this.height * this.width;
    }
}

let rect = new Rectangle(2, 5)

console.log(rect.calcArea())