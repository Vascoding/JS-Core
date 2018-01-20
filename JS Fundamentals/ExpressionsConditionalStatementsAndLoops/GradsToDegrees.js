function gradsToDegrees(grads) {

    let degree = (grads * 0.9) % 360

    if (grads < 0){
        console.log(360 - Math.abs(degree))
    } else {
        console.log(degree)
    }
}

gradsToDegrees(-50)