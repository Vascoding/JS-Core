function convert(json) {
    let arr = JSON.parse(json)
    let tableNmesSplited = JSON.stringify(arr[0])
    let tableNames = tableNmesSplited.split(/[:,"}{]/).filter(s => s !== '').filter((a, b) => {return b % 2 === 0})

    let html = "<table>\n"
    html += "   <tr>"
    for (let i = 0; i < tableNames.length; i++) {
        html += `<th>${htmlEscape(tableNames[i])}</th>`
    }
    html += '</tr>\n'


    for (let i = 0; i < arr.length; i++) {
        let tableValuesSplited = JSON.stringify(arr[i])
        let tableValues = tableValuesSplited.split(/[:,"}{]/).filter(s => s !== '').filter((a, b) => {return b % 2 !== 0})
        html += '   <tr>'
        for (let j = 0; j < tableValues.length; j++) {
            html += `<td>${htmlEscape(tableValues[j])}</td>`
        }
        html += '</tr>\n'
    }
    html += "</table>"
    console.log(html)

    function htmlEscape(str) {
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
    }
}

convert('[{"Name":"Pesho <div>-a","Age":20,"City":"Sofia"},{"Name":"Gosho","Age":18,"City":"Plovdiv"},{"Name":"Angel","Age":18,"City":"Veliko Tarnovo"}]')