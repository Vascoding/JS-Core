function capitalize(str) {
    console.log(str
        .split(' ')
        .map(w => w[0].toUpperCase() + w.toLowerCase().substring(1, w.length))
        .join(' '))
}

capitalize('Was that Easy? tRY thIs onE for SiZe!')