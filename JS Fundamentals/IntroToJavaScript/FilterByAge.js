

function filterByAge(minAge, firstName, firstAge, secondName, secondAge) {
    var firstPerson = new Object();
    firstPerson.name = firstName;
    firstPerson.age = firstAge;
    secondPerson = new Object();
    secondPerson.name = secondName;
    secondPerson.age = secondAge;
    var all = [firstPerson, secondPerson];

    for (var i = 0; i < all.length; i++){
        if(all[i].age < minAge){
            all.pop();
            i--;
        }
    }
    for (var i = 0; i < all.length; i++){
        console.log(all[i]);
    }
}

console.log(filterByAge('20', 'Pesho', 19, 'Stoqn', 1));