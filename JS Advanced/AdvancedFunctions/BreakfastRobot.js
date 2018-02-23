function robot() {
    let ingredients = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    }

    let recipes = {
        'apple': { carbohydrate: 1, flavour: 2 },
        'coke': { carbohydrate: 10, flavour: 20 },
        'burger': { carbohydrate: 5, fat: 7, flavour: 3 },
        'omelet': { protein: 5, fat: 1, flavour: 1 },
        'cheverme': { protein: 10, carbohydrate: 10, fat: 10, flavour: 10 },
    };

    function prepare(recipe, quantity) {
        let meal = recipes[recipe];

        for (let key of Object.keys(meal)) {
            if (ingredients[key] < meal[key] * quantity) {
                return `Error: not enough ${key} in stock`;
            }
        }
        Object.keys(meal).forEach(key => ingredients[key] -= meal[key] * quantity);
        return'Success';
    }

    function restock(ingredient, quantity) {
        ingredients[ingredient] += quantity;
        return 'Success';

    }
    function report() {
        return `protein=${ingredients.protein} carbohydrate=${ingredients.carbohydrate} fat=${ingredients.fat} flavour=${ingredients.flavour}`
    }

    return function commandParser(str) {
        let cmdInfo = str.split(' ');
        let cmd = cmdInfo.shift();
        switch (cmd) {
            case "prepare":
                return prepare(cmdInfo[0], Number(cmdInfo[1]));
            case "restock":
                return restock(cmdInfo[0], Number(cmdInfo[1]));
            case "report":
                return report();
        }
    }
}

