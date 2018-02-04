function extractUniqueWords(arr) {
    let text = arr.join('')

    let unique = new Set()

    text.split(/[^\w+]/).filter(s => s !== '').forEach(a => unique.add(a.toLowerCase()))

    console.log([...unique].join(', '))
}

extractUniqueWords(['Interdum et malesuada fames ac ante ipsum primis in faucibus.\n' +
'Vestibulum volutpat lacinia blandit.\n' +
'Pellentesque dignissim odio in hendrerit lacinia.\n' +
'Vivamus placerat porttitor purus nec hendrerit.\n' +
'Aliquam erat volutpat. Donec ac augue ligula.\n' +
'Praesent venenatis sapien vitae libero ornare, nec pulvinar velit finibus.\n' +
'Proin dui neque, rutrum vel dolor ut, placerat blandit sapien.\n' +
'Pellentesque at est arcu.\n' +
'Nullam eget orci laoreet, feugiat nisi vitae, egestas libero.\n' +
'Pellentesque pulvinar aliquet felis.\n' +
'Interdum et malesuada fames ac ante ipsum primis in faucibus.\n' +
'Etiam sit amet nisl ex.\n' +
'Sed lacinia pretium metus quis fermentum.\n' +
'Praesent a ante suscipit, efficitur risus cursus, scelerisque risus.\n'])