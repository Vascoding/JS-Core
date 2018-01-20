

function leapYear(year) {
    if (year % 4 === 0){
        if (year === 1900){
            console.log('no');
        }
        else {
            console.log('yes');
        }
    }
    else {
        console.log('no');
    }
}

console.log(leapYear(2000));

var first = 1900 % 4;
var second = 1900 % 100;

console.log(first);
console.log(second);