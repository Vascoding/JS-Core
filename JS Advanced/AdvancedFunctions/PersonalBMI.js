function solve(name, age, weight, height) {
    let bmi = weight / Math.pow((height / 100), 2)

    let obj = {
        name: name,
        personalInfo: {
            age: age,
            weight: weight,
            height: height
        },
        BMI: Math.round(bmi),
        status:  (function(){
            if (bmi < 18.5) {
                return 'underweight'
            } else if (bmi < 25) {
                return 'normal'
            } else if (bmi < 30) {
                return 'overweight'
            } else {
                return 'obese'
            }
        })()
    }
    if (obj.status === 'obese') {
        obj.recommendation = 'admission required'
    }
    return obj
}

console.log(solve('Petkan', 20, 80, 178));