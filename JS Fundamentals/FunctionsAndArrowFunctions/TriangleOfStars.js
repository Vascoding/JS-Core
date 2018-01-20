function tiangleOfStars(stars) {
    for (let i = 1; i <= stars; i++) {
        console.log('*'.repeat(i))
    }
    for (let i = stars - 1; i >= 1; i--) {
        console.log('*'.repeat(i))
    }
}

tiangleOfStars(5)