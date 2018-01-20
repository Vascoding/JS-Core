console.log(sumAndVat([3.12, 5, 18, 19.24, 1953.2262, 0.001564, 1.1445]));

function sumAndVat(args) {
    var vat = 0;
    var sum = 0;
    for (var i = 0; i < args.length; i++){
        vat += args[i] * 0.2;
        sum += args[i];
    }
    console.log(sum);
    console.log(vat);
    console.log(sum + vat);
}

