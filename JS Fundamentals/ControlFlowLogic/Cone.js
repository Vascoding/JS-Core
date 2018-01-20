

function coneVolume(radius, height) {
    console.log('Volume = ' + Math.PI * radius * radius * height / 3);
    console.log('Area = ' + Math.PI * radius * (radius  + Math.sqrt(height * height + radius * radius)));
}

console.log(coneVolume(3, 5));