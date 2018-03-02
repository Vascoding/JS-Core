function play(card, suit) {
    let validCards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
    let validSuits = {
        S: '\u2660',
        H: '\u2665',
        D: '\u2666',
        C: '\u2663'
    }

    toString = function () {
        let validCard = validCards.find(a => a === card)
        let validSuit = validSuits[suit]
        if (validCard !== undefined && validSuit !== undefined) {
            return `${validCard}${validSuit}`
        }
         throw new Error('Card is not valid!')
    }
    return toString()
}

console.log(play('A', 'H').toString())