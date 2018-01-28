function checkIfStartsWithSubstring(str, substr) {
    let check = str.indexOf(substr)
    if (check === 0) {
        console.log('true')
    } else {
        console.log('false')
    }
}

checkIfStartsWithSubstring('How have you been?', 'How')