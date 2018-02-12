function parser(document) {
    let validSurvey = document.match(/<svg>.+<\/svg>/g)
    if (!validSurvey) {
        console.log('No survey found')
    } else {
        let sections = validSurvey[0].match(/(\s*<cat>.+<\/cat>\s*){2}/g)
        if (!sections) {
            console.log('Invalid format')
            return
        }

        let label = sections[0].substring(0, sections[0].indexOf('</text>'))
        let valid = label.match(/(\[.+\])/g)
        if (!valid) {
            console.log('Invalid format')
            return
        }
        let validLabel = valid[0].substring(1, valid[0].length - 1)

        let ratings = sections[0].substring(sections[0].indexOf('</text>'))

        let allRaitings = ratings.match(/<g><val>([0-9]{1,2})<\/val>([0-9]+)<\/g>/g)
        if (!allRaitings) {
            console.log('Invalid format')
            return
        }
        let valRegex = new RegExp(/<g><val>([0-9]+)<\/val>([0-9]+)<\/g>/)
        let sumOfRatings = 0
        let voteCount = 0
        for (let rate of allRaitings){

            sumOfRatings += Number(valRegex.exec(rate)[1]) * Number(valRegex.exec(rate)[2])
            voteCount += Number(valRegex.exec(rate)[2])
        }

        let avgRating = sumOfRatings / voteCount
        console.log(`${validLabel}: ${Math.round(avgRating * 100) / 100}`)
    }
}

parser('<p>Our guests may enjoy a special menu of freshly caught seafood.</p><br><svg><cat><text>How do you rate the special menu? [Food - Special]</text></cat> <cat><g><val>1</val>5</g><g><val>5</val>13</g><g><val>10</val>22</g></cat></svg>')