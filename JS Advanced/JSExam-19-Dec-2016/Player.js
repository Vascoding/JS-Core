class Player{
    constructor(nickname){
        this.nickname = nickname
        this.score = []
    }

    addScore(score){
        if (Number(score) || Number(score) === 0 && score !== null) {
            this.score.push(Number(score))
        }
        return this
    }

    get scoreCount(){
        return this.score.length
    }

    get highestScore(){
        return this.score.length > 0 ? Math.max(...this.score) : undefined
    }

    get topFiveScore(){
        return  this.score.sort((a, b) => {
            return b - a
        }).slice(0, 5)
    }

    toString(){
        return `${this.nickname}: [${this.score.sort((a, b) => {
            return b - a
        })}]`
    }
}
let peter = new Player("Peter");
let maria = new Player("Maria")
    .addScore(350)
    .addScore(779)
    .addScore(null)
console.log(maria.toString())
