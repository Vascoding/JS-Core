function extractLinks(arr) {
    let expression = /www\.[A-Za-z0-9-]+(\.[a-z]+)+/gi;
    let regex = new RegExp(expression);
    let links = []
    for (let sent of arr) {
        let matches = sent.match(regex)
        if (matches) {
            for (let match of matches){
                links.push(match)
            }
        }
    }

console.log(links.join('\n'))
}

extractLinks(['Join WebStars now for free, at www.web-stars.com',
    'You can also support our partners:',
    'Internet - www.internet.com',
    'WebSpiders - www.webspiders101.com',
    'Sentinel - www.sentinel.-ko'])