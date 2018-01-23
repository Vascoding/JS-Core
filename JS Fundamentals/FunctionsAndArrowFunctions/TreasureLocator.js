function treasureLocator(args) {
    for (let i = 0; i < args.length; i+=2) {
        let first = args[i],
            second = args[i + 1]

        function tuvalu(x, y) {
            if (x >= 1 && x <= 3){
                if (y >= 1 && y <= 3){
                    return true
                }
            }
            return false
        }

        function tokelau(x, y) {
            if (x >= 8 && x <= 9){
                if (y >= 0 && y <= 1){
                    return true
                }
            }
            return false
        }
        function samoa(x, y) {
            if (x >= 5 && x <= 7){
                if (y >= 3 && y <= 6){
                    return true
                }
            }
            return false
        }
        function tonga(x, y) {
            if (x >= 0 && x <= 2){
                if (y >= 6 && y <= 8){
                    return true
                }
            }
            return false
        }
        function cook(x, y) {
            if (x >= 4 && x <= 9){
                if (y >= 7 && y <= 8){
                    return true
                }
            }
            return false
        }

        if (tuvalu(first, second)) {
            console.log('Tuvalu')
        }
        else if (tokelau(first, second)) {
            console.log('Tokelau')
        }
        else if (samoa(first, second)) {
            console.log('Samoa')
        }
        else if (tonga(first, second)) {
            console.log('Tonga')
        }
        else if (cook(first, second)) {
            console.log('Cook')
        } else {
            console.log('On the bottom of the ocean')
        }
    }
}

treasureLocator([4, 2, 1.5, 6.5, 1, 3])