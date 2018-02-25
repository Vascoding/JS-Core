function monkeyPatcher(command) {
    let commands = {
        upvote: () => {
            this.upvotes ++
        },
        downvote: () => {
            this.downvotes ++
        },
        score: () => {
            let reportedAmount = 0;
            if (this.upvotes + this.downvotes > 50){
                reportedAmount = Math.ceil(Math.max(this.upvotes, this.downvotes) * 0.25);
            }
            let upVotes = this.upvotes;
            let downVotes = this.downvotes;
            let totalScore = upVotes - downVotes;
            let totalVotes = upVotes + downVotes;
            let rating = '';

            if (totalVotes >= 10) {
                if (upVotes / totalVotes > 0.66) {
                    rating = 'hot'
                } else if (totalScore >= 0 && (upVotes > 100 || downVotes > 100)) {
                    rating = 'controversial'
                } else if (totalScore < 0) {
                    rating = 'unpopular'
                } else {
                    rating = 'new'
                }
            }
            else if (totalVotes < 10) {
                rating = 'new'
            }

            return [upVotes + reportedAmount, downVotes + reportedAmount, totalScore, rating]
        }
    }
    return commands[command]()
}


let post = {
    id: '3',
    author: 'emil',
    content: 'wazaaaaa',
    upvotes: 100,
    downvotes: 100
};
monkeyPatcher.call(post, 'upvote')
monkeyPatcher.call(post, 'downvote')
let score = monkeyPatcher.call(post, 'score')
console.log(score)// [127, 127, 0, 'controversial']
for (let i = 0; i < 50; i++) {
    monkeyPatcher.call(post, 'downvote')
}      // (executed 50 times)
console.log(score = monkeyPatcher.call(post, 'score'))
