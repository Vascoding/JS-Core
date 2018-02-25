function orderRectange(rectangles) {
    let store = []
    function createRectangle(width, height) {
        let rect = {
            width: width,
            height: height,
            area: function () {
                return this.width * this.height
            },
            compareTo: function (other) {
                return other.area() - this.area() || other.width - this.width
            }
        }
        return rect
    }

    for (let i = 0; i < rectangles.length; i++) {
        let width = rectangles[i][0]
        let height = rectangles[i][1]
        let newRect = createRectangle(width, height)
        store.push(newRect)
    }

    store.sort((a,b) => a.compareTo(b))
    return store
}

console.log(orderRectange([[10, 5], [3, 20], [5, 12]]));