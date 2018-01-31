function scoreToHtml(scoreJSON) {
    let html = "<table>\n";
    html += " <tr><th>name</th><th>score</th>\n";
    let arr = JSON.parse(scoreJSON);
    for (let obj of arr)
        html += ` <tr><td>${htmlEscape(obj['name'])}` +
            `</td><td>${htmlEscape(obj['score'])}</td></tr>\n`;
    return html + "</table>";

    function htmlEscape(str) {
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
}

scoreToHtml('[{"name":"Pesho & Kiro","score":479},{"name":"Gosho, Maria & Viki","score":205}]')