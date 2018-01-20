

function letterOccurrences(word, letter) {
    var count = 0;
    for(var i = 0; i < word.length; i++){
        if(word[i] == letter){
            count++;
        }
    }
    console.log(count);
}
