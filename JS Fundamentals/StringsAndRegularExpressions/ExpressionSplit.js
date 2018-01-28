function expressionSplit(str) {
    let match = /[\s().,;]+/g
    console.log(str.split(match).join('\n'))
}

expressionSplit('let sum = 1 + 2;if(sum > 2){\tconsole.log(sum);}')