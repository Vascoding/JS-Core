function findVariable(str) {
    console.log(str.split(' ').filter(v => v.startsWith('_')).map(a => a.substring(1)).join(','))
}

findVariable('The _id and _age variables are both integers.')