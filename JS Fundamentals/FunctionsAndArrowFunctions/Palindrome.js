function isPalindrome(word) {
    let reversed = word.split('').reverse().join("")
    return reversed === word
}

console.log(isPalindrome('abba'))