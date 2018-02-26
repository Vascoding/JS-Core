function extension() {
    let myObj = {
        extend: function (template) {
            for (let el in template) {
                if (template[el] === '[object Function]') {
                    Object.getPrototypeOf(this)[el] = template[el]
                } else {
                    this[el] = template[el]
                }
            }
        }
    }

    return myObj
}

let someCar = {
    engine: 'm52',
    drift: function () {
        console.log('drift')
    }
}
let testObject = extension();
testObject.extend(someCar);
