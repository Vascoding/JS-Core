function construct(obj) {
    if (obj.handsShaking) {
         modify(obj)
    }

    function modify(obj) {
         obj.bloodAlcoholLevel += (obj.weight * 0.1) * obj.experience
        obj.handsShaking = false
    }
    return obj
}

console.log(construct({ weight: 95,
    experience: 3,
    bloodAlcoholLevel: 0,
    handsShaking: false }
));