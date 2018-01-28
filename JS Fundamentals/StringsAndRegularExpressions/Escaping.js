function escaping(arr) {

    console.log('<ul>')
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        console.log(`   <li>${arr[i]}</li>`)
    }

    console.log('</ul>')
}

escaping(['<b>unescaped text</b>', 'normal text'])