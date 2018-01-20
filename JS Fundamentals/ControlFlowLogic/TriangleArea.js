
function triangleArea(first, second, third) {
    var s = (first + second + third) / 2;
    console.log(Math.sqrt(s * (s - first) * (s - second) * (s - third)));
}

console.log(triangleArea(2, 3.5, 4));