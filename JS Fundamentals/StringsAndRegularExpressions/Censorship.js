function censorship(text, arr) {
    for (let i = 0; i < arr.length; i++) {
        while (true){
            let start = text.indexOf(arr[i])
            if (start < 0) {
                break
            }
            text = text.replace(arr[i], '-'.repeat(arr[i].length))
        }
    }
    console.log(text)
}

censorship('roses are red, violets are blue', [', violets are', 'red'])