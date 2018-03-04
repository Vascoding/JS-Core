let result = (function(){

    let validCards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    let Suits = {
        SPADES: '\u2660',
        HEARTS: '\u2665',
        DIAMONDS: '\u2666',
        CLUBS: '\u2663'
    }

    class Card {
        constructor(face, suit) {
            this.face = face
            this.suit = suit
        }

        get face(){
            return this._face
        }

        set face(newFace){
            if (!validCards.includes(newFace)) {
                throw new Error(`Card face ${newFace} is not valid!`)
            }
            this._face = newFace
        }

        get suit() {
            return this._suit
        }

        set suit(newSuit){
            if (!Object.keys(Suits).map(s => Suits[s]).includes(newSuit)) {
                throw new Error(`Suit ${newSuit} not valid!`)
            }
            this._suit = newSuit
        }
    }

    return {
        Suits:Suits,
        Card:Card
    }
}())


let Card = result.Card
let Suits = result.Suits

let card = new Card('Q', Suits.DIAMONDS)
console.log(card)