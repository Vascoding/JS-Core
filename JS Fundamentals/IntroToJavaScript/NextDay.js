

function NextDay(year, month, day) {
    if(year == 1){
        year = 1901;
    }
    var date = new Date(year + '/' + month + '/' + day);

    var newDate = new Date(date.toDateString());
    newDate.setDate(newDate.getDate() + 1);

    var year = newDate.getFullYear();
    var month = newDate.getMonth() + 1;
    var day = newDate.getDate();
    console.log(year + '-' + month + '-' + day);
}

console.log(NextDay(1, 1, 1));