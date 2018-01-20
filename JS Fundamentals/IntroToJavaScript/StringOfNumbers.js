

function stringOfNumbers(number) {
    var num = '';
    for (var i = 1; i <= number; i++){
        num = num.concat(i);
    }

    console.log(num);
}

console.log(stringOfNumbers('11'));