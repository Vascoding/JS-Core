function deck(deckOfCards) {
    function makeCard(card, suit) {
        let validCards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
        let validSuits = {
            S: '\u2660',
            H: '\u2665',
            D: '\u2666',
            C: '\u2663'
        }

        let validCard = validCards.find(a => a === card)
        let validSuit = validSuits[suit]
        if (validCard !== undefined && validSuit !== undefined) {
            return `${validCard}${validSuit}`
        }
        throw new Error(`Invalid card: ${card}${suit}`)

    }

    let validCards = []
    for (let i = 0; i < deckOfCards.length; i++) {
        let card = deckOfCards[i].substring(0, deckOfCards[i].length - 1)
        let suit = deckOfCards[i][deckOfCards[i].length - 1]
        try {
            let valid = makeCard(card, suit)
            validCards.push(valid)
        } catch (ex) {
            console.log(ex.message)
            return
        }
    }

    console.log(validCards.join(' '));
}

deck(['3D', 'JC', '2S', '10H', '5X'])