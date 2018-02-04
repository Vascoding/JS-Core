function table(arr) {
    let html = '<table>\n'
    for (let i = 0; i < arr.length; i++) {
        let obj = JSON.parse(arr[i])
        html += '   <tr>\n'
        html += `       <td>${obj['name']}</td>\n`
        html += `       <td>${obj['position']}</td>\n`
        html += `       <td>${obj['salary']}</td>\n`
        html += '   <tr>\n'

    }
    html += '</table>'
    console.log(html)
}

table(['{"name":"Pesho","position":"Promenliva","salary":100000}',
    '{"name":"Teo","position":"Lecturer","salary":1000}',
    '{"name":"Georgi","position":"Lecturer","salary":1000}'])