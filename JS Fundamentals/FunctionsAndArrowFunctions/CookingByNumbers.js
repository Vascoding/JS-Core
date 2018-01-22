function cookingByNumbers(args) {
    let number = args[0]
    for (let i = 1; i < args.length; i++) {
        if (args[i] === 'chop') {
            number = chop(number)
            console.log(number)
        }
        if (args[i] === 'dice') {
            number = dice(number)
            console.log(number)
        }
        if (args[i] === 'spice') {
            number = spice(number)
            console.log(number)
        }
        if (args[i] === 'bake') {
            number = bake(number)
            console.log(number)
        }
        if (args[i] === 'fillet') {
            number = fillet(number)
            console.log(number)
        }
    }

    function chop(num) {
        return num / 2
    }
    function dice(num) {
        return Math.sqrt(num)
    }
    function spice(num) {
        return num + 1
    }
    function bake(num) {
        return num * 3
    }
    function fillet(num) {
        return num - num * 0.20
    }
}

cookingByNumbers([9, 'dice', 'spice', 'chop', 'bake', 'fillet'])